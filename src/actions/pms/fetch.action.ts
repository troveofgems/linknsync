'use server';
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {AttachedPMS, Prisma} from "@prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

/**
 * This File Contains the Logic for Attaching or Updating PMS Data To An Organization
 * */
export type FetchPMSListProps = {
    id: string;
};

export interface FetchPMSListActionState {
    message: string;
    response: {
        pmsList: Partial<AttachedPMS>[]
    };
    errors?: {
        processing?: Error | PrismaClientValidationError,
    };
    pState?: SessionDataState | null;
}

export const fetchPMSAction = async(
    user: SessionDataState,
): Promise<FetchPMSListActionState> => {
    const // Owner Data
        { loggedInUser, profile } = user as SessionDataState;
        /*coid = profile!.org.id,
        cid  = loggedInUser!.userId!,
        sid = loggedInUser!.sessionId!*/


    try {
        const pmsListFetchResponse = await db
            .attachedPMS
            .findMany({
                where: {},
                select: {
                    domain: true,
                    pmsName: true,
                    blockReasonId: true
                }
            });

        return {
            message: "PMS Successfully Attached!",
            response: {
                pmsList: pmsListFetchResponse
            }
        };
    } catch(error) {
        return {
            message: 'Error Attaching PMS',
            response: {
                pmsList: []
            },
            errors: {
                processing: error as Error
            },
            pState: user
        };
    }
};