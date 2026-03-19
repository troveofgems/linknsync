"use server";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {createUserAuditAction_BackgroundProcess} from "@/actions/audit/user/delete.action";

/**
 * This File Contains the Logic for Deleting a Property
 * */
export type DeletePropertyActionState = {
    message: string;
    response?: {
        deletedProperty?: boolean;
    }
    errors?: Error;
    pState?: SessionDataState
};

export const deletePropertyAction = async(
    prevState: DeletePropertyActionState,
    form: FormData,
    generateAudit = true
): Promise<DeletePropertyActionState> => {
    console.log("Delete Property Action PrevState: ", prevState, form)
    const propertyId = form.get("property.id") as string;

    const // Owner Data
        { loggedInUser, profile } = prevState.pState as SessionDataState,
        coid = profile!.org.id,
        cid  = loggedInUser!.userId!,
        sid = loggedInUser!.sessionId!;

    // Cascade Delete? - Should be set in Prisma
    await db.property.delete({
        where: {
            id: propertyId
        }
    });

    // System Audit Log Background Process
    if(generateAudit) {
        const
            actionsTaken = [
                `Property Deleted (Cascading): ${propertyId}`
            ],
            auditData = compileUserAuditObject(
                actionsTaken, "delete.action", "property",
                coid, cid, sid
            );
        createUserAuditAction_BackgroundProcess(auditData).then(() => {});
    }

    return {
        message: "The Property And All Associated Data Have Been Deleted!",
        response: {
            deletedProperty: true
        },
        pState: prevState?.pState
    } as DeletePropertyActionState;
}