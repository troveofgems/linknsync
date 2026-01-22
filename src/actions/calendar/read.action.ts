'use server';
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {ICalEntry} from "@prisma/client";

export interface ReadICalActionState {
    message: string;
    response?: {
        icalSources?: Partial<ICalEntry>[];
    };
    errors?: {
        [p: string]: string[];
    };
    pState?: SessionDataState | null;
}
export type ReadICalSourcesProps = {
    propertyId: string;
    user: SessionDataState;
}

export const readICalSourceListAction = async(
    prevState: ReadICalActionState,
    searchParams: ReadICalSourcesProps,
): Promise<ReadICalActionState> => {
    const icalSources = await db.iCalEntry.findMany({
        where: {
            propertyId: searchParams.propertyId
        },
        select: {
            id: true,
            importType: true,
            icalUrl: true,
            icalFilename: true,
            isMainSrc: true,
            createdAt: true,
            updatedAt: true,
            UserImprint: {
                select: {
                    id: true,
                    fullName: true,
                    appRole: true
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    return {
        message: "ICal Source List Successfully Fetched!",
        response: {
            icalSources
        },
        pState: prevState?.pState
    };
};