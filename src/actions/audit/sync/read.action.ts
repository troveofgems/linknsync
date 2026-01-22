"use server";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Reading JobSchedule Sync Audit Data For an Organization
 * */
export type ReadSyncAuditActionState = {
    message: string;
    response: object;
    errors?: {
        [p: string]: string[]
    }
    pState?: SessionDataState;
};

export type ReadSyncAuditActionListByOrgIdParams = {
    coid: string;
}

export const fetchSyncAuditListAction = async(
    prevState: ReadSyncAuditActionState,
    searchParams: ReadSyncAuditActionListByOrgIdParams
) => {
    try {
        const fetchSyncAuditListResponse = await db.scheduledJobsAudit.findMany({
            where: {
                orgImprintId: searchParams.coid as string
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return {
            message: "Sync Audit List Fetch Successful!",
            response: fetchSyncAuditListResponse,
            pState: prevState.pState,
        };
    } catch(error) {
        return {
            message: 'Error Fetching Sync Audit List',
            error,
            pState: prevState.pState,
        };
    }
};