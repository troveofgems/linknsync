"use server";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Reading Property Data
 * */
export type ReadConflictResolutionsAuditActionState = {
    message: string;
    response: object;
    errors?: {
        [p: string]: string[]
    }
    pState?: SessionDataState;
};

export type ReadConflictResolutionsAuditActionListByOrgIdParams = {
    coid: string;
}

export const fetchConflictResolutionsAuditListAction = async(
    prevState: ReadConflictResolutionsAuditActionState,
    searchParams: ReadConflictResolutionsAuditActionListByOrgIdParams
) => {
    const { coid } = searchParams.coid as unknown as ReadConflictResolutionsAuditActionListByOrgIdParams;
    try {
        const fetchConflictResolutionsAuditListResponse = await db.resolutionAudit.findMany({
            where: {
                orgImprintId: coid as string
            },
            select: {
                id: true,
                propertyName: true,
                firstBookedBy: true,
                conflictUploadedBy: true,
                retainedBookingStartDate: true,
                retainedBookingEndDate: true,
                removedBookingStartDate: true,
                removedBookingEndDate: true,
                resolutionAction: true,
                conflictDetectedOn: true,
                createdAt: true
            }
        });
        return {
            message: "Conflict Resolutions Audit List Fetch Successful!",
            response: fetchConflictResolutionsAuditListResponse
        };
    } catch(error) {
        return { message: 'Error Fetching User Audit List', error };
    }
};