'use server';
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

export interface CreateCalendarActionState {
    message: string;
    response: {
        generatedCalendarId: string;
    };
    errors?: {
        [p: string]: string[];
    };
    pState?: SessionDataState | null;
}
export type CreateCalendarProps = {
    coid: string;
    Property: {
        connect: {
            id: string;
        }
    }
}

export const createCalendarAction = async(
    prevState: CreateCalendarActionState,
    calendar: CreateCalendarProps,
): Promise<CreateCalendarActionState> => {
    const { id: generatedCalendarId } = await db.calendar.create({
        data: { ...calendar }
    });

    return {
        message: "Calendar Successfully Created & Linked To Property",
        response: {
            generatedCalendarId
        },
        pState: prevState?.pState
    }
}