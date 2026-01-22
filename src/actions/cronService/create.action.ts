"use server";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Creating a Property
 * */
export interface CreateCronServiceActionState {
    message: string;
    response: {
        generatedCronServiceId: string;
    };
    errors?: {
        [p: string]: string[];
    };
    pState?: SessionDataState | null;
}
export type CreateCronServiceProps = {
    coid: string;
    Property: {
        connect: { id: string; }
    },
    Calendar: {
        connect: { id: string; }
    }
}

export const createCronServiceAction = async(
    prevState: CreateCronServiceActionState,
    cronService: CreateCronServiceProps
): Promise<CreateCronServiceActionState> => {
    const { id: generatedCronServiceId } = await db.cronService.create({
        data: {
            nextRun: await calculateNextRun("DAILY"),
            ...cronService
        }
    });

    return {
        message: "Cron Service Successfully Created",
        response: {
            generatedCronServiceId
        },
        pState: prevState?.pState
    }
}

export const calculateNextRun = async (scheduleType: string, jobBeganAt?: Date) => {
    const date = new Date();
    if(scheduleType === "DAILY" && !jobBeganAt) {
        date.setHours(new Date().getHours() + 24);
        date.setMinutes(new Date().getMinutes());
    } else if (scheduleType === "DAILY" && !!jobBeganAt) {
        date.setHours(new Date(jobBeganAt).getHours() + 24);
        date.setMinutes(new Date(jobBeganAt).getMinutes());
    }

    if(scheduleType === "HOURLY" && !jobBeganAt) {
        date.setHours(new Date().getHours() + 1);
        date.setMinutes(new Date().getMinutes());
    } else if (scheduleType === "HOURLY" && !!jobBeganAt) {
        date.setHours(new Date(jobBeganAt).getHours() + 1);
        date.setMinutes(new Date(jobBeganAt).getMinutes());
    }

    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};