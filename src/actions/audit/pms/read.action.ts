"use server";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Reading User Audits
 * */
export type ReadPMSAuditActionState = {
    message: string;
    response: object;
    errors?: {
        [p: string]: string[]
    }
    pState: SessionDataState | null;
};

export type ReadPMSAuditActionListByOrgIdParams = {
    coid: string;
}

export const fetchPMSAuditListAction = async(
    prevState: ReadPMSAuditActionState,
    searchParams: ReadPMSAuditActionListByOrgIdParams
) => {
    try {
        const
            fetchPMSAuditListResponse = await db.pmsUpdateLog.findMany({
                where: { orgImprintId: searchParams.coid },
                select: {
                    id: true,
                    pms: true,
                    pmsBlockId: true,
                    pmsCallActionType: true,
                    pmsResponse: true,
                    callStatusCode: true,
                    callStatusText: true,
                    requestToPMSSubmittedAt: true,
                    lnsDateBlockId: true,
                    lnsCallType: true,
                    propertyId: true,
                    sourceSlug: true,
                    user: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
        })
        return {
            message: "PMS Audit List Fetch Successful!",
            response: fetchPMSAuditListResponse,
            pState: prevState.pState,
        };
    } catch(error) {
        return {
            message: 'Error Fetching PMS Audit List',
            error ,
            pState: prevState.pState,
        };
    }
};