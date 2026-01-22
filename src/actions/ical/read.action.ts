"use server";
import db from "../../db/connect.db";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Reading Property List or Individual Data By Id
 * */
export interface ReadEventsByPropertyIdActionState {
    message: string;
    response: {
        propertyById: any;
        events?: any[];
    };
    error?: Error | null;
    pState?: SessionDataState;
}

export type ReadEventsByPropertyIdParams = {
    propertyId: string;
}

export const fetchEventsByPropertyIdAction = async(
    prevState: ReadEventsByPropertyIdActionState,
    searchParams: ReadEventsByPropertyIdParams
) => {
    try {
        const fetchEventsPropertyIdResponse = await db.property.findFirst({
            where: {
                AND: {
                    coid: prevState!.pState!.profile!.org.id as string,
                    id: searchParams.propertyId as string,
                }
            },
            select: {
                id: true,
                name: true,
                Calendar: {
                    select: {
                        id: true,
                        icalSources: {
                            select: {
                                id: true,
                                importType: true,
                                icalUrl: true,
                                dateBlocks: {
                                    select: {
                                        id: true,
                                        calendarId: true,
                                        calendarType: true,
                                        startDate: true,
                                        endDate: true,
                                        eventUID: true,
                                        iCalEntryId: true,
                                        priority: true,
                                        propertyName: true,
                                        summary: true,
                                        UserImprint: {
                                            select: {
                                                cid: true,
                                                fullName: true,
                                                appRole: true
                                            }
                                        }
                                    }
                                },
                                dateBlockConflicts: true,
                                UserImprint: {
                                    select: {
                                        cid: true,
                                        fullName: true,
                                        appRole: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return {
            message: "Events By Property Id Fetch Successful!",
            response: {
                propertyById: fetchEventsPropertyIdResponse,
                events: fetchEventsPropertyIdResponse!.Calendar!.icalSources,
            },
            pState: prevState.pState,
        };
    } catch(error) {
        return {
            message: 'Error Fetching Property By Id',
            response: {},
            error,
            pState: prevState.pState
        };
    }
};

export const fetchLNSExport = async(
    prevState,
    searchParams
) => {

}