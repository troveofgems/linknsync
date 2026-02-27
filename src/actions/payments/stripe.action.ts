"use server";
/*import db from "@/db/connect.db";
import { createUserAuditAction_BackgroundProcess } from "@/actions/audit/user/create.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";*/
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains All Stripe Logic
 * */
export interface StripeActionState {
    message: string;
    response: {
        formData?: FormData;
    };
    errors?: object;
    pState?: SessionDataState;
};

export const updateICalAction = async(
    prevState: StripeActionState,
    form: FormData,
    generateAudit = true
): Promise<StripeActionState> => {
    const
        coid = prevState.pState?.profile?.org.id as string,
        cid = prevState.pState?.loggedInUser?.userId as string,
        sid = prevState.pState?.loggedInUser?.sessionId as string,
        ownerType = prevState.pState?.loggedInUser?.orgRole as string;

    // Track Audit Actions
    const actionsTaken: string[] = [];

    actionsTaken.push("Adding Console.log")
    console.log("Polarsh: ", generateAudit, coid, cid, sid, ownerType, actionsTaken);



    // Generate Audit
    if(generateAudit) {
        /*const auditData = compileUserAuditObject(
            actionsTaken, "update.action", "ical",
            coid, cid, sid
        );
        createUserAuditAction_BackgroundProcess(auditData).then(() => {});*/
    }

    return {
        message: "Polarsh Subscription Successfully Placed!",
        response: {},
        pState: prevState.pState
    } as StripeActionState;
};

