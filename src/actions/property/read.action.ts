"use server";
import db from "../../db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {Property} from "@prisma/client";

/**
 * This File Contains the Logic for Reading Property List or An Individual Property By ID
 * */
export interface ReadPropertyActionState {
    message: string;
    response: {
        propertyList?: Property[],
        propertyById?: Property;
    };
    error?: Error | null;
    pState?: SessionDataState | null;
}

export type ReadPropertyListParams = {
    coid: string;
    cid: string;
    orgRole: string;
    orgPermissions: string[];
    sessionId: string;
    username: string;
}
export type ReadPropertyByIdParams = {
    propertyId: string;
}

export const fetchPropertyListAction = async (
    prevState: ReadPropertyActionState,
    searchParams: ReadPropertyListParams
) => {
    const
        useQueryForPLAsAndALAs = searchParams.orgRole !== "IND" && searchParams.orgRole !== "RLA",
        useQueryForIndependents = searchParams.orgRole === "IND",
        useQueryForRLAs = searchParams.orgRole === "RLA";

    let query = {};
    if(useQueryForPLAsAndALAs) {
        query = {
            coid: searchParams.coid || "zzz"
        };
    } else if (useQueryForIndependents) {
        query = {
            cid: searchParams.cid,
        };
    } else if (useQueryForRLAs) {
        query = {
            /*permissions: {
                in: []
            }*/
            coid: searchParams.coid || "zzz"
        };
    }

    try {
        const fetchPropertyListResponse = await db.property.findMany({
            where: query,
            include: {
                Address: {
                    select: {
                        street: true,
                        street2: true,
                        street3: true,
                        city: true,
                        state: true,
                        postalCode: true,
                        country: true
                    }
                },
                Photo: {
                    select: {
                        id: true,
                        title: true,
                        width: true,
                        height: true,
                        thumbnailUrl: true,
                        srcUrl: true
                    }
                },
                Calendar: {
                    select: {
                        icalSources: {
                            select: {
                                id: true,
                                importType: true,
                                icalUrl: true,
                                icalFilename: true,
                                isMainSrc: true,
                                createdAt: true,
                                updatedAt: true,
                                dateBlocks: true,
                                UserImprint: {
                                    select: {
                                        id: true,
                                        fullName: true,
                                        appRole: true
                                    }
                                }
                            }
                        },
                        CronService: true
                    }
                }
            }
        });
        return {
            message: "Property List Fetch Successful!",
            response: {
                propertyList: fetchPropertyListResponse
            },
            pState: prevState?.pState
        };
    } catch(error) {
        return { message: 'Error Fetching Property List', error };
    }
};

export const fetchPropertyByIdAction = async(
    prevState: ReadPropertyActionState,
    searchParams: ReadPropertyByIdParams
) => {
    try {
        const fetchPropertyByIdResponse = await db.property.findFirst({
            where: {
                coid: prevState!.pState!.profile!.org.id as string,
                id: searchParams.propertyId as string,
            },
            include: {
                Address: {
                    select: {
                        street: true,
                        street2: true,
                        street3: true,
                        city: true,
                        state: true,
                        postalCode: true,
                        country: true,
                        isMUA: true
                    }
                },
                AttachedPMS: {
                    select: {
                        id: true,
                        pmsList: true,
                        foreignIdList: true,
                    }
                },
                Photo: {
                    select: {
                        id: true,
                        title: true,
                        width: true,
                        height: true,
                        thumbnailUrl: true,
                        srcUrl: true,
                    }
                },
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
                                                appRole: true,
                                            }
                                        }
                                    }
                                },
                                dateBlockConflicts: true,
                                UserImprint: {
                                    select: {
                                        fullName: true,
                                        appRole: true
                                    }
                                }
                            }
                        },
                        CronService: true
                    }
                },
            }
        });
        return {
            message: "Property By Id Fetch Successful!",
            response: {
                propertyById: fetchPropertyByIdResponse
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

export const fetchMinimalPropertyByIdTileInfoAction = async(
    prevState: ReadPropertyActionState,
    searchParams: ReadPropertyByIdParams
) => {
    try {
        const fetchPropertyByIdResponse = await db.property.findFirst({
            where: {
                coid: prevState!.pState!.profile!.org.id as string,
                id: searchParams.propertyId as string,
            },
            select: {
                id: true,
                name: true,
                homepageLink: true,
                Address: {
                    select: {
                        isMUA: true,
                        street: true,
                        street2: true,
                        street3: true,
                        city: true,
                        state: true,
                        postalCode: true,
                        country: true
                    }
                },
                Photo: {
                    select: {
                        id: true,
                        title: true,
                        width: true,
                        height: true,
                        srcUrl: true,
                        thumbnailUrl: true
                    }
                }
            }
        });

        return {
            message: "Property By Id Fetch Successful!",
            response: {
                propertyById: fetchPropertyByIdResponse
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