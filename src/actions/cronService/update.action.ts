"use server";
import db from "@/db/connect.db";
import {addNewEvents, processDateBlocksFromURL, removeExistingEvents} from "@/actions/dateblock/create.action";
import {calculateNextRun} from "@/actions/cronService/create.action";
import {ConflictResolution, CronServiceStatus, ScheduleType} from "@prisma/client";

/**
 * This File Contains the Logic for Updating or Batch Processing Calendar Events
 * */
export type UpdateCronServiceActionState = {
    message: string;
    response: object;
    errors?: {
        [p: string]: string[]
    },
    pState?: object;
};

export type UpdateCronServiceActionListByOrgIdParams = {
    source: {
        Property: {
            name: string;
        };
        id: string;
        urlSources: {
            id: string;
            icalUrl: string;
            icalFilename: string;
            userImprintId: string;
            propertyId: string;
            calendarId: string;
        }[];
        scheduleType: string;
        lastRun?: Date;
        nextRun: Date;
        status: string;
        coid: string;
    }
};

export const processConflictResolutions = async (resolvedConflicts: {
    id: string;
    propertyName: string;
    firstBlock: {
        UserImprint: {
            fullName: string;
        },
        startDate: Date;
        endDate: Date;
        priority: string;
    },
    UserImprint: {
        id: string;
        fullName: string;
    },
    eventUID: string;
    startDate: Date;
    endDate: Date;
    priority: string;
    propertyId: string;
    calendarId: string;
    iCalEntryId: string;
    firstBlockId: string;
    prodid: string;
    version: string;
    createdAt: Date;
    coid: string;
}[]) => {
    const resolvedConflictsToStore = resolvedConflicts.map((item) => ({
        propertyName: item.propertyName,
        firstBookedBy: item.firstBlock.UserImprint.fullName,
        conflictUploadedBy: item.UserImprint.fullName,
        eventUID: item.eventUID,
        retainedBookingStartDate: item.firstBlock.startDate,
        retainedBookingEndDate: item.firstBlock.endDate,
        removedBookingStartDate: item.startDate,
        removedBookingEndDate: item.endDate,
        resolutionAction: item.priority === "PRIORITY_0" ? ConflictResolution.KEPT_PLA :
            item.firstBlock.priority === "PRIORITY_1" ? ConflictResolution.KEPT_ALA : ConflictResolution.NONE,
        propertyId: item.propertyId,
        calendarId: item.calendarId,
        icalEntryId: item.iCalEntryId,
        firstBlockId: item.firstBlockId,
        oldConflictId: item.id,
        prodid: item.prodid,
        version: item.version,
        conflictDetectedOn:  item.createdAt,
        orgImprintId: item.coid,
        userImprintId: item.UserImprint.id,
        updatedAt: new Date()
    }));

    let response = null;
    if(resolvedConflicts.length > 0) {
        response = await db.resolutionAudit.createMany({
            data: resolvedConflictsToStore,
        });

        console.log("Response From Resolution Audit: ", response);
    }

    return {
        message: "Processed Conflict Resolutions Successfully!",
        response: {
            processedConflictResolutionCount: (response?.count || 0)
        }
    };
};

export const runCronServiceListAction = async(
    prevState: UpdateCronServiceActionState,
    params: UpdateCronServiceActionListByOrgIdParams
) => {
    const jobBeganAt = new Date();
    await setToPendingProcessing(
        jobBeganAt,
        params.source.id,
        params.source.coid
    );

    const processedRecords = await Promise.allSettled(
        params.source.urlSources.map(async (ical) => await icalBatchProcessor(ical, params))
    );
    await setToCompletedProcessing(
        jobBeganAt,
        params.source.id,
        params.source.coid,
        params.source.scheduleType as ScheduleType
    );

    const auditData = {
        scheduleType: params.source.scheduleType,
        jobBeganAt: jobBeganAt,
        jobEndedAt: new Date(),
        pcs: [
            `Processed ${processedRecords.length} ics files from ${params.source.Property.name}`,
        ],
        status: CronServiceStatus.PROCESSED,
        errors: [],
        orgImprintId: params.source.coid
    };

    await db.scheduledJobsAudit.create({ data: auditData });

    return {
        message: "Cron Service Run Successful!",
        response: {
            processedRecords: processedRecords.length
        },
        pState: prevState
    };
};

export const icalBatchProcessor = async (
    ical: {
        id: string;
        userImprintId: string;
        icalUrl: string;
        icalFilename: string;
        calendarId: string;
        propertyId: string;
    },
    params: {
        source: {
            coid: string;
            id: string;
        }
    }
) => {
    const ownerType = await db.userImprint.findUnique({
        where: {
            id: ical.userImprintId
        },
        select: {
            appRole: true
        }
    });

    const freshDateblockPull = await processDateBlocksFromURL(
        [],
        ical.icalUrl || "",
        ical.calendarId,
        ical.propertyId,
        ical.userImprintId,
        params.source.coid,
        params.source.id,
        ownerType!.appRole
    );

    const // Compile A List of All Ids in the DateBlock and Conflict Tables and Merge EventUIDs for comparison.
        dbConflictIdListResponse = await db.dateBlockConflict.findMany({
            where: {
                iCalEntryId: ical.id
            },
            select: {
                eventUID: true
            }
        }),
        dbDateBlockIdListResponse = await db.dateBlock.findMany({
            where: {
                iCalEntryId: ical.id
            },
            select: {
                eventUID: true
            }
        }),
        mergedExistingIds = [
            ...dbDateBlockIdListResponse.map(item => item.eventUID),
            ...dbConflictIdListResponse.map(item => item.eventUID),
        ];

    const mergedFreshIds = [
        ...freshDateblockPull.map(item => item.eventUID),
    ];

    const // First Find Additions
        addEvents = freshDateblockPull
            .filter((item) => !mergedExistingIds.includes(item.eventUID)),
        // IdListFiltered Finds Removals
        removeEvents = mergedExistingIds.filter((item) => !mergedFreshIds.includes(item));

    let actionsTaken: string[];
    if (// If Results are 0, there were no changes to the ICal File since upload or last pull.
        (!addEvents || addEvents.length) === 0 &&
        (!removeEvents || removeEvents.length) === 0
    ) {
        actionsTaken = [
            `Updates From ICal: ${ical.icalFilename || "No Data"}`,
            `No Changes Detected Since Last Upload or Pull`,
        ];
    } else {
        actionsTaken = [`Updates From ICal: ${ical.icalFilename}`];

        // Process Deletes First
        const { response: removeExistingEventsResponse } = await removeExistingEvents(removeEvents, actionsTaken);
        actionsTaken = removeExistingEventsResponse.actionsTaken;

        // Process Additions Next
        const { response: addNewEventsResponse } = await addNewEvents(addEvents, ical.id, actionsTaken);
        actionsTaken = addNewEventsResponse.actionsTaken;
    }

    return actionsTaken;
};

type CronUpdateParams = {
    status: CronServiceStatus,
    lastRun?: Date,
    nextRun?: Date
}

const setToPendingProcessing = async (jobBeganAt: Date, id: string, coid: string) => {
    await db.cronService.update({
        where: {
            coid: coid,
            id: id
        },
        data: {
            status: CronServiceStatus.PROCESSING,
            lastRun: jobBeganAt,
        } as CronUpdateParams
    });
};

const setToCompletedProcessing = async(
    jobBeganAt: Date,
    id: string,
    coid: string,
    scheduleType: ScheduleType,
) => {
    await db.cronService.update({
        where: {
            coid: coid,
            id: id
        },
        data: {
            status: CronServiceStatus.PROCESSED,
            lastRun: jobBeganAt,
            nextRun: await calculateNextRun(scheduleType, jobBeganAt)
        } as CronUpdateParams
    });
};