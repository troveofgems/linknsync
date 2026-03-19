'use server';
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

export interface UserAuditActionState {
    message: string;
    response: {
        generatedUserActionAuditId?: string;
    },
    errors?: {
        [p: string]: string[];
    }
    pState: SessionDataState; // TODO: Change the name of this to better reflect its role in the code.
}
export type UserAuditProps = {
    actionsTaken: string[];
    api: string;
    path: string;
    uec?: string;
    userImprintId: string;
    orgImprintId: string;
    sessionId: string;
}

export const createUserAuditAction = async (
    prevState: UserAuditActionState,
    auditData: UserAuditProps
): Promise<UserAuditActionState> => {
    const {id: generatedUserActionAuditId } = await db.userAudit.create({
        data: auditData as UserAuditProps
    });

    return {
        message: "User Action Audit Complete",
        response: {
            generatedUserActionAuditId
        },
        pState: prevState.pState
    }
}

export const createUserAuditAction_BackgroundProcess = async (
    auditData: UserAuditProps
): Promise<UserAuditActionState> => await createUserAuditAction(
    {} as UserAuditActionState,
    auditData
);