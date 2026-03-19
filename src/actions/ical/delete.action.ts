"use server";
import db from "@/db/connect.db";
import {DeleteICalSchema} from "@/validator/file.validation.schema";
import { createUserAuditAction_BackgroundProcess } from "@/actions/audit/user/create.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {SessionDataState} from "@/store/userStore";
import {
    deleteTrackUnitBlockAction,
    TrackUnitBlockActionState
} from "@/actions/pms/_pms/track.actions";

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

    // Return Failed Validation Otherwise Continue With Processing Below
    if(!validatedFields.success) {
        return {
            message: "Please resolve the form errors and re-submit.",
            response: {},
            errors: validatedFields?.error?.flatten()?.fieldErrors
        } as DeleteICalActionState;
    }

    // Check For PMS Logs... TODO: Create A Better Flow For This
    const pmsLogs = await db.pmsUpdateLog.findMany({
        where: {
            icalEntryId: resource.icalSourceId,
        }
    });

    const deletesToPushToPMS =
        pmsLogs // Only look for Created Calls to PMS otherwise Delete All other associated DateBlocks
            .filter((item) =>
                item.callStatusCode === "201"
            );

    console.log("Deletes to push to track? ", deletesToPushToPMS);

    if(deletesToPushToPMS.length > 0) {
        console.log("Deletes to push to track exist! ", deletesToPushToPMS);
        const pmsDeletedResources = await deleteTrackUnitBlockAction(
            prevState as TrackUnitBlockActionState,
            deletesToPushToPMS
        );
        console.log("PMS Deleted Resources Response: ", pmsDeletedResources);
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
            //...deletedResource
        },
        pState: prevState.pState
    } as DeleteICalActionState;
};