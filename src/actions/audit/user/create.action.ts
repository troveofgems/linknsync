'use server';
import db from "@/db/connect.db";

export interface CreateUserAuditActionState {
    message: string;
    response: {
        generatedUserActionAuditId?: string;
    },
    errors?: {
        [p: string]: string[];
    }
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
        }
    }
}

export const createUserAuditAction_BackgroundProcess = async (
    auditData: CreateUserAuditProps
): Promise<CreateUserAuditActionState> => await createUserAuditAction(
    {} as CreateUserAuditActionState,
    auditData
);