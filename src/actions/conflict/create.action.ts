"use server";
import {DateBlock, DateBlockConflict} from "@prisma/client";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {createSendConflictsDetectedEmailAction, CreateSendEmailActionState} from "@/actions/email/send.action";

/**
 * This File Contains the Logic for Creating a Property
 * */
export interface CreateConflictActionState {
    message: string;
    response?: {
        processedConflictCount?: number;
    },
    errors?: {
        [p: string]: string[];
    }
    pState?: SessionDataState | null;
}

export const createConflictAction = async(
    prevState: CreateConflictActionState,
    conflicts: DateBlockConflict[],
): Promise<CreateConflictActionState> => {
    if(!conflicts || conflicts?.length === 0) {
        return {
            message: "No Conflicts Were Found",
            response: {
                processedConflictCount: 0,
            },
            pState: prevState.pState
        }
    }

    const processedConflicts = processConflicts(conflicts);

    const createConflictResponse = await db.dateBlockConflict.createMany({
        data: processedConflicts.inputData,
        skipDuplicates: true
    });

    if(createConflictResponse.count > 0) {
        createSendConflictsDetectedEmailAction(
            {} as CreateSendEmailActionState,
            processedConflicts
        ).then(() => {});
    }

    return {
        message: "Processed Conflicts",
        response: {
            processedConflictCount: createConflictResponse.count,
        },
        pState: prevState.pState
    };
}

const processConflicts = (
    conflicts: DateBlock[]
) => {
    console.log("Conflicts To Process: ", conflicts);

    const mappedData = conflicts.map((conflict, index) => {
        return {
            ...conflict.second,
            priority: conflict.first.priority,
            firstBlockId: conflict.first.id,
            overlapDuration: calculateOverlapMinutes({
                first: conflict.first as DateBlock,
                second: conflict.second as DateBlock,
            }),
            resolved: false,
            resolutionAction: 'NONE'
        };
    });

    return {
        processedConflictCount: mappedData.length,
        inputData: mappedData
    };
}

// Helper function to check for date overlaps
const calculateOverlapMinutes = (
    {first, second}:
    {first: DateBlock, second: DateBlock}
) => {
    const
        start = Math.max(
            first?.startDate?.getTime() as number,
            second?.startDate?.getTime() as number
        ),
        end = Math.min(
            first?.endDate?.getTime() as number,
            second?.endDate?.getTime() as number
        );
    return (end >= start) ?
        Math.round((end - start) / 60000) :
        -1; // Return -1 if no overlap exists
};