"use server";
import db from "@/db/connect.db";
import {DeleteICalSchema} from "@/validator/file.validation.schema";
import { createUserAuditAction_BackgroundProcess } from "@/actions/audit/user/create.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Deleting An ICal File
 * */
export type DeleteICalActionState = {
    message: string;
    response: object;
    errors?: {
        deleteConfirmation?: string[];
    }
    pState?: SessionDataState
};

export const deleteICalAction = async(
    prevState: DeleteICalActionState,
    form: FormData,
    generateAudit = true
): Promise<DeleteICalActionState> => {
    console.log(prevState, form);
    const // FormData & Variable Extracts With Validation
        coid = prevState.pState?.profile?.org.id as string,
        cid = prevState.pState?.loggedInUser?.userId as string,
        sid = prevState.pState?.loggedInUser?.sessionId as string,
        resource = {
            propertyId:  form.get("property.id") as string,
            calendarId:  form.get("calendar.id") as string,
            icalSourceId:  form.get("ical.source.id") as string
        },
        userInput = {
            deleteConfirmation: form.get("code.deletion.confirmation") as string,
            generatedDeleteConfirmationCode: form.get("code.deletion.generated") as string,
        },
        validatedFields = DeleteICalSchema.safeParse(userInput);

    console.log("Validated fields: ", validatedFields);

    // Return Failed Validation Otherwise Continue With Processing Below
    if(!validatedFields.success) {
        return {
            message: "Please resolve the form errors and re-submit.",
            response: {},
            errors: validatedFields?.error?.flatten()?.fieldErrors
        } as DeleteICalActionState;
    }

    // Prisma Delete Call
    const deletedResource = await db.iCalEntry.delete({
        where: {
            id: resource.icalSourceId
        },
        select: {
            icalFilename: true,
            dateBlocks: true,
            dateBlockConflicts: true
        }
    });

    // System Audit Log Background Process
    if(generateAudit) {
        const
            actionsTaken = [
                `ICal Deleted: ${deletedResource.icalFilename}`,
                `Events Removed: ${deletedResource.dateBlocks.length}`,
                `Conflicts Removed: ${deletedResource.dateBlockConflicts.length}`
            ],
            auditData = compileUserAuditObject(
                actionsTaken, "delete.action", "ical",
                coid, cid, sid
            );
        createUserAuditAction_BackgroundProcess(auditData).then(() => {});
    }

    return { // Returns Result of Processing
        message: "The iCal resource has been successfully removed!",
        response: {
            ...deletedResource
        },
        pState: prevState.pState
    } as DeleteICalActionState;
};