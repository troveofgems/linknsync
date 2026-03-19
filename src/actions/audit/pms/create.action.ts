'use server';
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {PmsUpdateLog} from "@prisma/client";

export interface CreatePMSAuditActionState {
    message: string;
    response: {
        generatedPMSActionAuditId?: string;
    },
    errors?: {
        [p: string]: string[];
    }
    pState: SessionDataState;
}
export type CreatePMSAuditProps = PmsUpdateLog;

export const createPMSAuditAction = async (
    prevState: CreatePMSAuditActionState,
    auditData: CreatePMSAuditProps
): Promise<CreatePMSAuditActionState> => {
    const {id: generatedPMSActionAuditId } = await db.pmsUpdateLog.create({
        data: auditData,
    });

    return {
        message: "User Action Audit Complete",
        response: {
            generatedPMSActionAuditId
        },
        pState: prevState.pState
    }
}

export const createUserAuditAction_BackgroundProcess = async (
    auditData: CreatePMSAuditProps
): Promise<CreatePMSAuditActionState> => await createPMSAuditAction(
    {} as CreatePMSAuditActionState,
    auditData
);