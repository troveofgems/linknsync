"use server";

import {runCronServiceListAction, UpdateCronServiceActionState} from "@/actions/cronService/update.action";
import db from "@/db/connect.db";

/**
 * This File Contains the Logic for Reading Property Data
 * */
export type ReadCronServiceActionState = {
    message: string;
    response: object;
    errors?: {
        [p: string]: string[]
    }
};

export type ReadCronServiceActionListByOrgIdParams = {
    coid: string;
}

export const fetchCronServiceListAction = async(
    prevState: ReadCronServiceActionState,
    searchParams: ReadCronServiceActionListByOrgIdParams
) => {
    try {
        const fetchCronServiceListResponse = await db.cronService.findMany({
            where: {
                coid: searchParams.coid as string
            },
            select: {
                id: true,
                icalFileUploadLimit: true,
                scheduleType: true,
                lastRun: true,
                nextRun: true,
                urlSources: {
                    select: {
                        icalFilename: true,
                        importType: true,
                        UserImprint: {
                            select: {
                                cid: true,
                                fullName: true,
                                appRole: true
                            }
                        }
                    }
                },
                status: true,
                Property: true,
                createdAt: true
            },
            orderBy: {
                lastRun: 'desc'
            }
        });

        return {
            message: "Cron Service List Fetch Successful!",
            response: fetchCronServiceListResponse,
            pState: prevState
        };
    } catch(error) {
        return { message: 'Error Fetching Cron Service List', error, prevState };
    }
};

type ScheduledJob = {
    id: string;
    urlSources: {
        id: string;
        icalUrl: string;
        icalFilename: string;
        userImprintId: string;
        propertyId: string;
        calendarId: string;
    }[];
    Property: {
        name: string;
    };
    icalFileUploadLimit: string;
    scheduleType: string;
    lastRun?: Date;
    nextRun: Date;
    status: string;
    coid: string;
    propertyId: string;
    calendarId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const fetchSystemScheduledJobs = async () => {
    const
        errata: ScheduledJob[] = [],
        dailyProcessing: ScheduledJob[] = [],
        hourlyProcessing: ScheduledJob[] = [];

    let allEntries: unknown[] = [];

    try {
        allEntries = await db.cronService.findMany({
            where: {
                OR: [
                    { nextRun: { lte: new Date() } }
                ]
            },
            select: {
                id: true,
                urlSources: {
                    select: {
                        id: true,
                        icalUrl: true,
                        icalFilename: true,
                        userImprintId: true,
                        propertyId: true,
                        calendarId: true,
                    }
                },
                scheduleType: true,
                lastRun: true,
                nextRun: true,
                status: true,
                coid: true,
                Property: {
                    select: {
                        name: true
                    }
                }
            },
        });
    } catch(err) {
        console.log(err);
    }

    const fullProcessing = [dailyProcessing, hourlyProcessing, errata];

    // Sort Everything
    allEntries.forEach((item) => {
        const {scheduleType} = item as unknown as { scheduleType: string; };
        switch(scheduleType) {
            case "DAILY":
                dailyProcessing.push(item as ScheduledJob);
                break;
            case "HOURLY":
                hourlyProcessing.push(item as ScheduledJob);
                break;
            default:
                errata.push(item as ScheduledJob);
        }
    });

    // Process Hourly First
    fullProcessing[1].map(async (item) => {
        await runCronServiceListAction( // Process By Org Item Pulled Back
            {} as UpdateCronServiceActionState,
            { source: item }
        );
    });

    // Then Daily
    fullProcessing[0].map(async (item) => {
        await runCronServiceListAction( // Process By Org Item Pulled Back
            {} as UpdateCronServiceActionState,
            { source: item }
        );
    });

    // Probe Errata...
    fullProcessing[2].map(async (item) => {
        console.error("Unable To Process Job: ", item);
    });
}