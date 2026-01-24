'use server';
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

export interface CreateUserAuditActionState {
    message: string;
    response: {
        generatedUserActionAuditId?: string;
    },
    errors?: {
        [p: string]: string[];
    }
    pState: SessionDataState; // TODO: Change the name of this to better reflect its role in the code.
}
export type CreateUserAuditProps = {
    actionsTaken: string[];
    api: string;
    path: string;
    uec?: string;
    userImprintId: string;
    orgImprintId: string;
    sessionId: string;
}

export const createUserAuditAction = async (
    prevState: CreateUserAuditActionState,
    auditData: CreateUserAuditProps
): Promise<CreateUserAuditActionState> => {
    const {id: generatedUserActionAuditId } = await db.userAudit.create({
        data: auditData as CreateUserAuditProps
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
    auditData: CreateUserAuditProps
): Promise<CreateUserAuditActionState> => await createUserAuditAction(
    {} as CreateUserAuditActionState,
    auditData
);