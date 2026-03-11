'use server';
/*import db from "@/db/connect.db";*/
import {SessionDataState} from "@/store/userStore";
import {Prisma} from "@prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const encodedBearerToken = Buffer
    .from(`${process.env.TNS_LNS_API_KEY}:${process.env.TNS_LNS_SECRET_KEY}`)
    .toString("base64");

/**
 * This File Contains the Logic for Pushing Updates (Creates|Deletes) To Track PMS for Unit Blocks
 * */
export type CreateTrackUnitBlockProps = {
    unitId: string;
    blockReasonId: number;
    blockNotes: string;
    startDate: Date; // ISO 8601 format
    endDate: Date; // ISO 8601 format
}[];

/*const convertDateToISO8601 = (date: Date) => {
    return new Date(date); YYYY-MM-DD
}*/

export type DeleteTrackUnitBlockProps = {
    unitBlockIdList: string[];
};

export interface TrackUnitBlockActionState {
    message: string;
    response: {
        createdBlockId?: string;
        deletedBlockId?: string;
    };
    errors?: {
        processing?: Error | PrismaClientValidationError,
    };
    pState?: SessionDataState | null;
}

export const createTrackUnitBlockAction = async(
    prevState: TrackUnitBlockActionState,
    unitBlockIdList: CreateTrackUnitBlockProps,
): Promise<TrackUnitBlockActionState> => {
    try {
        console.log("Create Unit Block With: ", unitBlockIdList, encodedBearerToken);

        /*
        const tnsBaseUrl = `${process.env.TNS_BASE_URL}`;

        const response = await fetch(`${process.env.TNS_BASE_URL}/unit-blocks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${encodedBearerToken}`,
            },
            body: JSON.stringify({
                unitId: data.unitId,
                blockReasonId: data.blockReasonId,
                blockNotes: data.blockNotes,
                startDate: data.startDate,
                endDate: data.endDate
            } as CreateTrackUnitBlockProps),
        });

        if (!response.ok) {
            console.error("Failed to create block in track pms.");
        } else {
            // Store Track Response Id
        }

        */


        return {
            message: "Successfully Updated Track PMS",
            response: {}, //await response.json()
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
    unitBlockIdList: DeleteTrackUnitBlockProps,
): Promise<TrackUnitBlockActionState> => {
    try {
        console.log("Delete Unit Block With: ", unitBlockIdList);

        /*const response = await fetch(`${process.env.TNS_BASE_URL}/unit-blocks/${unitBlockId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${encodedBearerToken}`,
            }
        });

        if (!response.ok) {
            console.error("Failed to delete block in track pms.");
        }*/

        return {
            message: "Successfully Updated Track PMS",
            response: {} //await response.json()
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