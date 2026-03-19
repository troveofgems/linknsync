import icalPackage, {CalendarComponent, parseICS, VCalendar, VEvent} from "node-ical";
import {DateBlock} from "@/actions/actions.types";
import db from "@/db/connect.db";
import {DateBlockConflict, PmsUpdateLog, PriorityType, Prisma} from "@prisma/client";
import {createConflictAction, CreateConflictActionState} from "@/actions/conflict/create.action";
import {ConflictResolutions, processConflictResolutions} from "@/actions/cronService/update.action";
import {SessionDataState} from "@/store/userStore";
import DateBlockCreateManyInput = Prisma.DateBlockCreateManyInput;
import {
    confirmTrackIsConnected,
    deleteTrackUnitBlockAction,
    TrackUnitBlockActionState
} from "@/actions/pms/_pms/track.actions";

/**
 * This File Contains the Logic for Creating a Property
 * */
export interface CreateDateBlockActionState {
    message: string;
    response: {
        generatedDateBlocks?: number;
        generatedConflictBlocks?: number;
        conflicts?: DateBlock | DateBlock[] | {
            first: DateBlock
            second: DateBlock
        }[];
        nonConflicting?: DateBlock[];
    },
    errors?: {
        [p: string]: string[];
    },
    pState?: SessionDataState;
}
export type CreateDateBlockActionProps = {
    cid: string;
    coid: string;
    icalUrl: string;
    calendarId: string;
    propertyId: string;
    importType: string;
    slug?: string;
    importFile?: File;
    generatedICalResourceId: string;
}

export interface DateBlockConflictList {
    first: Partial<DateBlock>,
    second: Partial<DateBlock>,
}

export const createDateBlockAction = async(
    prevState: CreateDateBlockActionState,
    {
        cid,
        coid,
        icalUrl,
        calendarId,
        propertyId,
        importType,
        importFile,
        generatedICalResourceId,
        slug
    }: CreateDateBlockActionProps
): Promise<CreateDateBlockActionState> => {
    const
        dateBlocks: DateBlock[] = importType === "link" ?
            await processDateBlocksFromURL(
                [] as DateBlock[],
                icalUrl,
                calendarId,
                propertyId,
                cid,
                coid,
                slug,
                undefined,
                prevState!.pState!.loggedInUser!.orgRole as string
            ) :
            await processDateBlocksFromFile(
                [] as DateBlock[],
                importFile as File,
                calendarId,
                propertyId,
                cid,
                coid,
                slug,
                undefined,
                prevState!.pState!.loggedInUser!.orgRole as string
            ),
        [conflicts, nonConflicting] = await checkAndRouteEvents(dateBlocks, generatedICalResourceId);

    if(!conflicts && !nonConflicting) {
        return {
            message: "Processed DateBlocks!",
            response: {
                generatedDateBlocks: 0,
                generatedConflictBlocks: 0
            }
        }
    }

    const generatedDateBlocks = await db.dateBlock.createManyAndReturn({
        data: nonConflicting as DateBlockCreateManyInput[],
        skipDuplicates: true
    });

    const trackResponse = await confirmTrackIsConnected(
        propertyId,
        generatedDateBlocks,
        prevState.pState as SessionDataState
    );
    console.log("Track response? ", trackResponse);

    // Process Conflicts
    const generatedConflictBlocks = await createConflictAction(
        {} as CreateConflictActionState,
        conflicts as DateBlockConflictList[]
    );

    return {
        message: "Processed DateBlocks!",
        response: {
            generatedDateBlocks: generatedDateBlocks?.length ?? 0,
            generatedConflictBlocks: generatedConflictBlocks.response?.processedConflictCount || 0
        }
    }
}

/**
 * Exportable Internal Functions
 * */
// Processes ICS From URL
export const processDateBlocksFromURL = async (
    dateBlocks: DateBlock[],
    url: string,
    calendarId: string,
    propertyId: string,
    cid: string,
    coid: string,
    slug?: string,
    icalId?: string,
    ownerType?: string,
) => {
    const property = await db.property.findUnique({
        where: {
            id: propertyId
        },
        select: {
            name: true
        }
    });
    const webEvents: Record<string, CalendarComponent> = await icalPackage.async.fromURL(url);
    const dateBlock: DateBlock = {
        propertyName: property?.name || "",
        calendarId,
        calendarType: "",
        cid,
        coid,
        prodid: "Unknown",
        version: "Unknown",
        eventType: "Unknown",
        eventUID: "Unknown",
        eventCreated: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        slug: "Unknown",
        summary: "Unknown",
        isRecurring: false,
        recurrenceRule: "No Rules",
        priority:
            ownerType === "PLA" ? "PRIORITY_0" :
            ownerType === "ALA" ? "PRIORITY_1" :
                "NO_PRIORITY" as PriorityType,
        propertyId,
        userImprintId: cid
    };

    // Process Top Level Calendar Information
    const vCalendar: VCalendar = webEvents["vcalendar"] as VCalendar;
    dateBlock.calendarType = vCalendar?.type as unknown as string;
    dateBlock.prodid = vCalendar?.prodid as unknown as string;
    dateBlock.version = vCalendar?.version as unknown as string;

    // Process Event Level Information
    for(const key in webEvents) {
        const dateBlockEntry = {...dateBlock};
        if(key !== "vcalendar") {
            const vEvent: VEvent = webEvents[key] as VEvent;
            //const eventDateString = webEvents[key]?.dtstamp; // Track Files do not provide valid ISO Structured Data...

            // Process Events
            dateBlockEntry.eventType = webEvents[key].type;
            dateBlockEntry.eventUID = key.toString();
            dateBlockEntry.eventCreated = new Date();
            dateBlockEntry.summary = "No Summary";
            dateBlockEntry.slug = slug;
            dateBlockEntry.startDate = vEvent.start as Date;
            dateBlockEntry.endDate = vEvent.end as Date;
            if(!!icalId && icalId.length > 0) {
                dateBlockEntry.iCalEntryId = icalId;
            }
            dateBlocks.push(dateBlockEntry);
        }
    }
    return dateBlocks;
};

// Processes ICS From Files
export const processDateBlocksFromFile = async (
    dateBlocks: DateBlock[],
    icsFile: File,
    calendarId: string,
    propertyId: string,
    cid: string,
    coid: string,
    slug?: string,
    icalId?: string,
    ownerType?: string
) => {
    try {
        const property = await db.property.findUnique({
            where: {
                id: propertyId
            },
            select: {
                name: true
            }
        });
        const // Convert File to Buffer directly
            buffer = Buffer.from(await icsFile.arrayBuffer()),
            events = parseICS(buffer.toString());

        const dateBlock: DateBlock = {
            propertyName: property?.name || "",
            calendarId,
            cid,
            coid,
            calendarType: "",
            prodid: "Unknown",
            version: "Unknown",
            eventType: "Unknown",
            eventUID: "Unknown",
            eventCreated: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            summary: "Unknown",
            isRecurring: false,
            recurrenceRule: "No Rules",
            priority:
                ownerType === "PLA" ? "PRIORITY_0" :
                ownerType === "ALA" ? "PRIORITY_1" :
                    "NO_PRIORITY" as PriorityType,
            propertyId,
            userImprintId: cid
        };

        dateBlock.calendarType = events.vcalendar.type;
        if("prodid" in events.vcalendar) {
            dateBlock.prodid = events.vcalendar.prodid as string;
        }
        if("version" in events.vcalendar) {
            dateBlock.version = events.vcalendar.version as string;
        }

        // Process Event Level Information
        for(const key in events) {
            const dateBlockEntry = {...dateBlock};
            if(key !== "vcalendar") {
                const vEvent: VEvent = events[key] as VEvent;
                //const eventDateString = webEvents[key]?.dtstamp; // Track Files do not provide valid ISO Structured Data???...

                // Process Events
                dateBlockEntry.eventType = events[key].type;
                dateBlockEntry.eventUID = key.toString();
                dateBlockEntry.slug = slug;
                dateBlockEntry.eventCreated = new Date();
                dateBlockEntry.summary = "No Summary";
                dateBlockEntry.startDate = vEvent.start as Date;
                dateBlockEntry.endDate = vEvent.end as Date;
                if(!!icalId && icalId.length > 0) {
                    dateBlockEntry.iCalEntryId = icalId;
                }

                dateBlocks.push(dateBlockEntry);
            }
        }
    } catch (error) {
        console.error('Error processing ICS file:', error);
    }
    return dateBlocks;
};

// Checks & Routes Events into [conflicts, nonConflicting]
export const checkAndRouteEvents = async (
    events: DateBlock[],
    icalId: string
) => {
    if(events.length === 0) return events;
    const
        existingBlocks: DateBlock[] = await db.dateBlock.findMany({
            where: {
                calendarId: events[0].calendarId
            }
        }) as DateBlock[],
        conflicts: Array<{first: DateBlock, second: DateBlock}> = [],
        nonConflicting: DateBlock[] = [];

    // Check remaining events against existing events
    for (let i = 0; i < events.length; i += 1) {
        const currentEvent = events[i];
        let hasConflict = false;

        for (const existingEvent of [...existingBlocks]) {
            if (hasDateOverlap(currentEvent, existingEvent)) {
                conflicts.push({
                    first: {
                        ...existingEvent,
                        iCalEntryId: icalId
                    },
                    second: {
                        ...currentEvent,
                        iCalEntryId: icalId
                    }});
                hasConflict = true;
            }
        }

        if (!hasConflict) {
            nonConflicting.push({
                ...currentEvent,
                iCalEntryId: icalId
            });
        }
    }
    return [conflicts, nonConflicting];
};

// Checks Date Overlaps
const hasDateOverlap = (
    currentEvent: DateBlock,
    existingEvent: DateBlock
): boolean => {
    return (
        !!currentEvent.startDate && !!existingEvent.startDate &&
        !!currentEvent.endDate && !!existingEvent.endDate &&
        !!currentEvent.endDate && !!existingEvent.endDate &&
        currentEvent.startDate < existingEvent.endDate &&
        existingEvent.startDate <= currentEvent.endDate &&
        currentEvent.startDate !== existingEvent.endDate
)};

/**
 * Scheduled Service & Update Exportable Functions
 * */
export const addNewEvents = async (
    addEvents: DateBlock[],
    existingResourceId: string,
    actionsTaken: string[]
) => {
    const
        eventsToProcessExist = !!addEvents && addEvents.length > 0,
        [conflicts, nonConflicting] = eventsToProcessExist ? (
            await checkAndRouteEvents(addEvents, existingResourceId)
        ) : [
            [] as DateBlockConflict[],
            [] as DateBlock[]
        ],
        addNonConflictingEvents = [...[nonConflicting]].length > 0,
        addConflicts = [...[conflicts]].length > 0;

    console.log("Non-Conflicting Events To Add: ", nonConflicting);

    if(addNonConflictingEvents) {
        const createManyDateBlocksResponse = await db.dateBlock.createManyAndReturn({
            data: nonConflicting as DateBlockCreateManyInput[]
        });
        actionsTaken.push(`New Events Recorded: ${createManyDateBlocksResponse.length}`);
        // Add Events Call To Push To TravelNet/PMS - Create Unit Block
        if(process.env.NODE_ENV === 'development') {
            console.log("Add Non-conflicting Dates: ", createManyDateBlocksResponse)
        }
        /*await createTrackUnitBlockAction(
            {} as TrackUnitBlockActionState,
            nonConflicting,
            {}
        );*/
    } else {
        actionsTaken.push("New Events Recorded: 0");
    }

    if(addConflicts) {
        const { response: createManyConflictsResponse } = await createConflictAction(
            {} as CreateConflictActionState,
            conflicts as DateBlockConflictList[]
        );
        actionsTaken.push(`New Conflicts Recorded: ${createManyConflictsResponse?.processedConflictCount}`);
    } else {
        actionsTaken.push("New Conflicts Recorded: 0");
    }

    return {
        message: "New Events Added Successfully",
        response: {
            actionsTaken
        }
    }
}

export const removeExistingEvents = async (
    removeEvents: string[],
    actionsTaken: string[]
) => {
    const eventsToProcessExist = !!removeEvents && removeEvents.length > 0;

    console.log("Removing Events...", removeEvents);

    if(eventsToProcessExist) { // DateBlocks Processed First
        const deleteManyDateBlocksResponse = await db.dateBlock.deleteMany({
            where: {
                eventUID: {
                    in: removeEvents
                }
            }
        });
        // Add Events Call To Push To TravelNet/PMS For Removal Delete Unit Block
        if(process.env.NODE_ENV === "development") {
            console.log("Make call to delete existing events in lns from track: ", deleteManyDateBlocksResponse);
        }
        actionsTaken.push(`Existing Events Removed: ${deleteManyDateBlocksResponse.count}`);
        await deleteTrackUnitBlockAction(
           {} as TrackUnitBlockActionState,
           [] as Partial<PmsUpdateLog>[]
        );

        // Conflicts Processed Next
        const fetchConflictsResponse = await db.dateBlockConflict.findMany({
            where: {
                eventUID: {
                    in: removeEvents
                }
            },
            select: {
                id: true,
                calendarId: true,
                prodid: true,
                version: true,
                eventUID: true,
                eventCreated: true,
                startDate: true,
                endDate: true,
                priority: true,
                firstBlockId: true,
                firstBlock: {
                    select: {
                        propertyName: true,
                        startDate: true,
                        endDate: true,
                        UserImprint: {
                            select: {
                                id: true,
                                fullName: true,
                            }
                        }
                    }
                },
                propertyId: true,
                propertyName: true,
                iCalEntryId: true,
                UserImprint: {
                    select: {
                        id: true,
                        fullName: true,
                    }
                },
                coid: true,
                createdAt: true,
            }
        });

        const deleteManyConflictsResponse = await db.dateBlockConflict.deleteMany({
            where: {
                eventUID: {
                    in: removeEvents
                }
            }
        });
        actionsTaken.push(`Existing Conflicts Removed: ${deleteManyConflictsResponse.count}`);
        await processConflictResolutions(fetchConflictsResponse as unknown as ConflictResolutions[]);
    } else {
        actionsTaken.push("Existing Events Removed: 0");
        actionsTaken.push("Existing Conflicts Removed: 0");
    }

    return {
        message: "Removed Events Successfully",
        response: {
            actionsTaken
        }
    }
}