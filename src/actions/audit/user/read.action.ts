"use server";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Reading User Audits
 * */
export type ReadUserAuditActionState = {
    message: string;
    response: object;
    errors?: {
        [p: string]: string[]
    }
    pState: SessionDataState | null;
};

export type ReadUserAuditActionListByOrgIdParams = {
    coid: string;
}

export const fetchUserAuditListAction = async(
    prevState: ReadUserAuditActionState,
    searchParams: ReadUserAuditActionListByOrgIdParams
) => {
    const { coid } = searchParams.coid as unknown as ReadUserAuditActionListByOrgIdParams;
    try {
        const
            fetchUserAuditListResponse = await db.userAudit.findMany({
                where: { orgImprintId: coid },
                select: {
                    id: true,
                    actionsTaken: true,
                    api: true,
                    path: true,
                    uec: true,
                    UserImprint: {
                        select: {
                            fullName: true,
                            appRole: true
                        }
                    },
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
        })
        return {
            message: "User Audit List Fetch Successful!",
            response: fetchUserAuditListResponse,
            pState: prevState.pState,
        };
    } catch(error) {
        return {
            message: 'Error Fetching User Audit List',
            error ,
            pState: prevState.pState,
        };
    }
};