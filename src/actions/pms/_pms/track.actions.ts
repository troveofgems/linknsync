'use server';
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {AttachedPMS, DateBlock, PmsUpdateLog} from "@prisma/client";

const _constructBearerTokenForTrack = (apiKey: string, apiSecret: string) => Buffer
    .from(`${apiKey}:${apiSecret}`)
    .toString("base64");

/**
 * This File Contains the Logic for Pushing Updates (Creates|Deletes|Checks For Connection) To Track PMS for Unit Blocks
 * */
export type CreateTrackUnitBlockProps = {
    unitId: string;
    blockReasonId: number;
    blockNotes: string;
    startDate: string; // ISO 8601 format
    endDate: string; // ISO 8601 format
};
export type DeleteTrackUnitBlockProps = {
    deletesToPushToPMS: Partial<PmsUpdateLog>[];
    blockNotes?: string;
};

export interface TrackUnitBlockActionState {
    message: string;
    response: {
        createdBlockId?: string;
        deletedBlockId?: string;
    };
    errors?: {
        processing?: Error,
    };
    pState?: SessionDataState | null;
}
export interface TrackIsConnectedCheckActionState {
    message: string;
    response: {
        trackIsConnected?: boolean;
        updatesPushed?: boolean;
    };
    errors?: {
        processing?: Error,
    };
    pState?: SessionDataState | null;
}

type PMS = Partial<AttachedPMS>;

// ISO-8601: YYYY-MM-DD
const convertDateToISO8601 = (date: Date) => new Date(date)
    .toISOString()
    .substring(0,10);

const buildFinalBlockNotesString = async (
    data: CreateTrackUnitBlockProps,
    linkedItem: Partial<DateBlock>
) => {
    const user = await db.userImprint.findFirst({
        where: {
            id: linkedItem.userImprintId
        },
        select: {
            fullName: true,
            appRole: true
        }
    });

    data.blockNotes = `Booked by ${user?.fullName} (${user?.appRole}) - ${linkedItem.slug}`;
    return data;
}

async function processItemsSequentially(
    {
        pmsUrl,
        authToken,
        processingList,
        originalList
    }: {
        pmsUrl: string;
        authToken: string;
        processingList: CreateTrackUnitBlockProps[] | DeleteTrackUnitBlockProps[];
        originalList: Partial<DateBlock>[];
    }
) {
    const completedTasks = [];
    for (const data of processingList) {
        console.log("Original Data is: ", originalList, "versus", data);
        const
            originalItem = originalList
                .filter(item =>
                    item.id === data?.blockNotes?.split(":")[1]
                );

        console.log("Change Value of Block Notes Once Original Item is Found...", data, originalItem);

        const
            dataToSend = await buildFinalBlockNotesString(
                data as CreateTrackUnitBlockProps,
                originalItem[0]
            ),
            response = await runAsyncTask(pmsUrl, authToken, dataToSend);

        completedTasks.push({ meta: {...data, ...originalItem[0]}, response});
    }
    return completedTasks;
}

async function processPMSDeletesSequentially(
    {
        pmsUrl,
        authToken,
        processingList,
        originalList
    }: {
        pmsUrl: string;
        authToken: string;
        processingList: { unitBlockId: string }[];
        originalList: Partial<PmsUpdateLog>[];
    }
) {
    const completedTasks = [];
    const _extractId = (str: string) => {
        const parts = str.split("/").filter(Boolean);
        return parts[parts.length - 1];
    }
    for (const data of processingList) {
        console.log("Original Data is: ", originalList, "versus", data);
        const
            originalItem = originalList
                .filter(item => _extractId(item.pmsBlockId as string) === data.unitBlockId);

        console.log("Have Original Data?", originalItem)

        const response = await runAsyncTaskDeletes(pmsUrl, authToken, data.unitBlockId);
        completedTasks.push({ meta: {...data, ...originalItem[0]}, response});
    }
    return completedTasks;
}

const runAsyncTask = async(
    tnsDomainSetUrl: string,
    authorizationBearerToken: string,
    data: CreateTrackUnitBlockProps | DeleteTrackUnitBlockProps,
) => await fetch(
        `${tnsDomainSetUrl}/unit-blocks`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${authorizationBearerToken}`,
            },
            body: JSON.stringify(data),
        });

const runAsyncTaskDeletes = async(
    tnsDomainSetUrl: string,
    authorizationBearerToken: string,
    unitBlockId: string,
) => await fetch(
    `${tnsDomainSetUrl}/unit-blocks/${unitBlockId}`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${authorizationBearerToken}`,
        }
    });

export const createTrackUnitBlockAction = async(
    prevState: TrackUnitBlockActionState,
    nonConflictingEvents: DateBlock[],
    pms: PMS,
): Promise<TrackUnitBlockActionState> => {
    try {
        const
            { profile } = prevState as SessionDataState,
            pmsBaseUrl = `${process.env.TNS_BASE_URL}`,
            authorizationBearerToken = _constructBearerTokenForTrack(
                pms.apiKey as string,
                pms.secretKey as string
            ),
            attachedUnitId = await db.property.findFirst({
                where: {
                    id: nonConflictingEvents[0].propertyId as string
                },
                select: {
                    trackUnitId: true
                }
            }),
            updatesToPushToPMS = nonConflictingEvents
                .map((item: Partial<DateBlock>) => {
                    return ({
                        unitId: attachedUnitId?.trackUnitId as string,
                        blockReasonId: parseInt(pms.blockReasonId as string),
                        blockNotes: `LNS:${item.id}:${item.slug}:${item.eventUID}:${item.propertyName}`,
                        startDate: convertDateToISO8601(item.startDate as Date),
                        endDate: convertDateToISO8601(item.endDate as Date)
                    })
            }),
            pmsDomainSetUrl = pmsBaseUrl
                .replace("{domain}", pms.domain as string),
            onceAllTasksAreComplete = await processItemsSequentially(
                {
                    pmsUrl: pmsDomainSetUrl,
                    authToken: authorizationBearerToken,
                    processingList: updatesToPushToPMS,
                    originalList: nonConflictingEvents
                }
            );

        onceAllTasksAreComplete // Create Audit Footprint
            .map(async (task) => {
                console.log("Task was: ", task);
                const auditEntry = {
                    pms: "Track",
                    pmsBlockId: task.response.status === 201 ? task.response.headers.get("location") : "-",
                    pmsCallActionType: "Create Unit Block",
                    pmsResponse: task.response.toString(),
                    callStatusCode: task.response.status.toString(),
                    callStatusText: task.response.statusText,
                    requestToPMSSubmittedAt: task.response.headers.get('date') as string,
                    lnsDateBlockId: task.meta.id ?? "-",
                    lnsCallType: !!profile?.fullName ? `Manual By ${profile?.fullName}` : "System Generated",
                    orgImprintId: profile?.org?.id ?? "-",
                    sourceSlug: task.meta.slug ?? "-",
                    user: profile?.fullName ?? "LNS System",
                    propertyId: task.meta.propertyId ?? "-",
                    icalEntryId: task.meta.iCalEntryId ?? "-",
                };

                console.log("Audit Entry Log Will Be: ", auditEntry);

                await db.pmsUpdateLog.create({
                    data: auditEntry
                });
            });

        return {
            message: "Successfully Updated Track PMS",
            response: {

            },
        };
    } catch(error) {
        return {
            message: "Error Updating Track PMS",
            response: {},
            errors: {
                processing: error as Error
            },
            pState: prevState.pState
        };
    }
};

export const deleteTrackUnitBlockAction = async(
    prevState: TrackUnitBlockActionState,
    deletesToPushToPMS: Partial<PmsUpdateLog>[]
): Promise<TrackUnitBlockActionState> => {
    const _extractId = (str: string) => {
        const parts = str.split("/").filter(Boolean);
        return parts[parts.length - 1];
    }

    try {
        const
            { profile } = prevState as SessionDataState,
            pms = await db.attachedPMS.findFirst({
               where: {
                   orgImprintId: profile?.org?.id as string
               },
                select: {
                   domain: true,
                    apiKey: true,
                    secretKey: true
                }
            }),
            pmsBaseUrl = `${process.env.TNS_BASE_URL?.replace("{domain}", pms?.domain as string)}`,
            authorizationBearerToken = _constructBearerTokenForTrack(
                pms?.apiKey as string,
                pms?.secretKey as string
            ),
            trackUnitBlockIDsToDissociate = deletesToPushToPMS
                .map(item => ({ unitBlockId: _extractId(item.pmsBlockId as string) }));

        const onceAllTasksAreComplete = await processPMSDeletesSequentially(
            {
                pmsUrl: pmsBaseUrl,
                authToken: authorizationBearerToken,
                processingList: trackUnitBlockIDsToDissociate,
                originalList: deletesToPushToPMS,
            }
        );

        console.log("Process Deletes Completed: ", onceAllTasksAreComplete);

        onceAllTasksAreComplete // Delete Audit Footprint
            .map(async (task) => {
                console.log("Task was: ", task);
                const auditEntry = {
                    pms: "Track",
                    pmsBlockId: task.meta.unitBlockId,
                    pmsCallActionType: "Delete Unit Block",
                    pmsResponse: task.response.toString(),
                    callStatusCode: task.response.status.toString(),
                    callStatusText: task.response.statusText,
                    requestToPMSSubmittedAt: task.response.headers.get('date') as string,
                    lnsDateBlockId: task.meta.id ?? "-",
                    lnsCallType: !!task?.meta.user ? `Manual By ${task.meta.user}` : "System Generated",
                    orgImprintId: task.meta.orgImprintId ?? "-",
                    sourceSlug: task.meta.sourceSlug ?? "-",
                    user: profile?.fullName ?? "LNS System",
                    propertyId: task.meta.propertyId ?? "-",
                    icalEntryId: task.meta.icalEntryId ?? "-",
                };

                console.log("Audit Entry Log Will Be: ", auditEntry);

                await db.pmsUpdateLog.create({
                    data: auditEntry
                });
            });

        return {
            message: "Successfully Updated Track PMS With Deletes",
            response: {

            }
        };
    } catch(error) {
        return {
            message: "Error Updating Track PMS",
            response: {},
            errors: {
                processing: error as Error
            },
            pState: prevState.pState
        };
    }
};


export const confirmTrackIsConnected = async(
    propertyId: string,
    nonConflicting:  DateBlock[],
    prevState: SessionDataState | null,
): Promise<TrackIsConnectedCheckActionState> => {
    const // Owner Data
        { profile } = prevState as SessionDataState,
        coid = profile!.org.id,
        orgConstraint = coid || process.env.THROWAWAY_ORG_ID,
        trackIsConnectedCheck = await db.attachedPMS.findFirst({
        where: {
            orgImprintId: orgConstraint
        },
        select: {
            id: true,
            pmsName: true,
            domain: true,
            apiKey: true,
            secretKey: true,
            blockReasonId: true
        }
    });

    // Track is Not Connected
    if(trackIsConnectedCheck === null) {
        return {
            message: "Successfully Checked For Track PMS Connection",
            response: {
                trackIsConnected: false
            }
        };
    }

    // Track is Connected, Now Check for Slug Tags To Determine If Updates Should Be Pushed
    const updatesForTrack =
        nonConflicting
            .filter((item: DateBlock) => item.slug !== "track");

    // If Updates Exist Solely Based On Slug, Push to Track
    if(updatesForTrack.length > 0) {
        console.log("Continue Call To Push To Track...", updatesForTrack);
        const
            trackUpdatesResponse = await createTrackUnitBlockAction(
                prevState as TrackUnitBlockActionState,
                updatesForTrack,
                trackIsConnectedCheck
            );

        console.log("Track Updates Response...", trackUpdatesResponse);
    } else {
        console.log("No Updates Available For Track");
    }

    return {
        message: "Successfully Checked For Track PMS Connection",
        response: {
            trackIsConnected: true,
            updatesPushed: false
        }
    };
};