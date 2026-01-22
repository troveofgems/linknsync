"use server";
import db from "@/db/connect.db";
import { ICalSchema_LINK, ICalSchema_FileUpload } from "@/validator/file/file.validator";
import {
    createDateBlockAction,
    CreateDateBlockActionProps,
    CreateDateBlockActionState
} from "@/actions/dateblock/create.action";
import {ZodError} from "zod";
import { createUserAuditAction_BackgroundProcess } from "@/actions/audit/user/create.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Updating An ICal File
 * */
export interface CreateICalAttachmentActionState {
    message: string;
    response: {
        validatedICalResource?: {
            success: boolean;
            data?: {
                importType: string;
                icalSource: string | File;
            };
            error?: ZodError;
        };
        generatedICalResourceId?: string;
        processedDateBlockCount?: number;
        processedConflictCount?: number;
        formData?: FormData;
    },
    errors?: {
        icalSource?: string[];
    }
    pState?: SessionDataState | null;
}
export type CreateICalAttachmentProps = {
    importType: "link" | "fileUpload";
    icalUrl: string;
    icalFilename: string;
    isMainSrc?: boolean;
    Calendar: {
        connect: { id: string; }
    },
    CronService: {
        connect: { id: string; }
    },
    UserImprint: {
        connect: { id: string }
    }
    propertyId: string;
}

export const createICalAttachmentActionFromForm = async(
    prevState: CreateICalAttachmentActionState,
    form: FormData,
    generateAudit = true
): Promise<CreateICalAttachmentActionState> => {
    const propertyId = form.get("ical.property.id") as string;
    if(propertyId === "" || propertyId?.length === 0) {
        return {
            message: "Unable to Attach ICal Resource...",
            response: {
                formData: form
            },
            errors: {
                icalSource: ["No PID Received From System For Attachment..."]
            }
        }
    }

    console.log("Form: ", form.get("ical.file") as File);

    const fileFilename = (form.get("ical.file") as File) ?? undefined;

    const { loggedInUser, profile } = prevState.pState as SessionDataState,
        coid = profile!.org.id,
        sid = loggedInUser!.sessionId!,
        importType = form.get("ical.importType") as string,
        icalUrl = importType === "link" ?
            form.get("ical.href") as string :
            "",
        icalFilenameParts = icalUrl.split("/"),
        icalFilename = importType === "link" ? icalFilenameParts[icalFilenameParts.length - 1] : fileFilename?.name,
        property = await db.property.findFirst({
            where: {
                id: propertyId
            },
            select: {
                Calendar: {
                    select: {
                        id: true,
                        CronService: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
            }
        });

        console.log("Have property: ", property);

        const icalCount = await db.iCalEntry.count(
            {
                where: {
                    calendarId: property?.Calendar?.id,
                    cronServiceId: property?.Calendar?.CronService?.id,
                }
            }
        );

        console.log("ICal Count For Property: ", icalCount);

        const inputData = {
            importType,
            icalUrl,
            icalFilename,
            propertyId,
            isMainSrc: icalCount === 0,
            Calendar: {
                connect: { id: property?.Calendar?.id as string }
            },
            CronService: {
                connect: { id: property?.Calendar?.CronService?.id as string }
            },
            UserImprint: {
                connect: { id: prevState.pState?.loggedInUser?.userId as string }
            }
        };

    const { id: generatedICalResourceId } = await db.iCalEntry.create({
            data: inputData as CreateICalAttachmentProps
        });

    // Process DateBlocks[] & Conflicts[] From the ICal Resource
    const { response: dateBlockResponse } = await createDateBlockAction(
        { pState: prevState.pState } as CreateDateBlockActionState,
        {
            cid: prevState.pState?.loggedInUser?.userId as string,
            coid,
            icalUrl: inputData.icalUrl,
            calendarId: inputData.Calendar.connect.id,
            propertyId: inputData.propertyId,
            importType: inputData.importType,
            importFile: form.get("ical.file") as File,
            generatedICalResourceId
        });

    if(generateAudit) {
        const
            actionsTaken = [
                `ICal Attached: ${inputData.icalFilename}`,
                `Events Recorded: ${dateBlockResponse.generatedDateBlocks}`,
                `Conflicts Recorded: ${dateBlockResponse.generatedConflictBlocks}`
            ],
            auditData = compileUserAuditObject(
                actionsTaken, "create.action", "ical",
                coid, prevState.pState?.loggedInUser?.userId as string, sid
            );
        createUserAuditAction_BackgroundProcess(auditData).then(() => {});
    }

    return  {
        message: "The iCal Resource has been successfully created and linked to the property!",
        response: {
            generatedICalResourceId,
            processedDateBlockCount: dateBlockResponse.generatedDateBlocks,
            processedConflictCount: dateBlockResponse.generatedConflictBlocks,
        },
        pState: prevState.pState,
    } as CreateICalAttachmentActionState
}

export const createICalAttachmentAction = async(
    prevState: CreateICalAttachmentActionState,
    icalResource: CreateICalAttachmentProps,
    coid: string,
    importFile?: File
): Promise<CreateICalAttachmentActionState> => {
    console.log("Inside Create Ical...", importFile)
    const // Process ICal Resource
        { id: generatedICalResourceId } = await db.iCalEntry.create({
            data: icalResource as CreateICalAttachmentProps
        });

    console.log("Generated Ical Id: ", generatedICalResourceId);

    // Process DateBlocks[] & Conflicts[] From the ICal Resource
    const { response: dateBlockResponse } = await createDateBlockAction(
        { pState: prevState.pState } as CreateDateBlockActionState,
        {
            cid: icalResource.UserImprint.connect.id,
            coid,
            icalUrl: icalResource.icalUrl,
            calendarId: icalResource.Calendar.connect.id,
            propertyId: icalResource.propertyId,
            importType: icalResource.importType,
            importFile,
            generatedICalResourceId
        } as CreateDateBlockActionProps
    );

    return {
        message: "The iCal Resource has been successfully created and linked to the property!",
        response: {
            generatedICalResourceId,
            processedDateBlockCount: dateBlockResponse.generatedDateBlocks,
            processedConflictCount: dateBlockResponse.generatedConflictBlocks,
        }
    } as CreateICalAttachmentActionState;
}

export const validateICalAction = async(
    prevState: CreateICalAttachmentActionState,
    icalSource: {
        importType: string;
        icalSource: string;
    } | {
        importType: string;
        icalSource: File;
    }
): Promise<CreateICalAttachmentActionState> => ({
    message: "ICal Resource Validated",
    response: {
        validatedICalResource: icalSource.importType === "link" ? (
            ICalSchema_LINK.safeParse(icalSource)
        ) : (
            ICalSchema_FileUpload.safeParse(icalSource)
        )
    },
    pState: prevState?.pState
});