"use server";
import db from "@/db/connect.db";
import {ICalSchema_FileUpload, ICalSchema_LINK} from "@/validator/file/file.validator";
import {createICalAttachmentActionFromForm, CreateICalAttachmentActionState} from "@/actions/ical/create.action";
import { createUserAuditAction_BackgroundProcess } from "@/actions/audit/user/create.action";
import {
    addNewEvents,
    processDateBlocksFromURL,
    removeExistingEvents
} from "@/actions/dateblock/create.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {SessionDataState} from "@/store/userStore";
import {lnsExportCreateDateToICSFormat, lnsExportDateToICSFormat} from "@/lib/utils/DateTime/date.utils";

import { writeFile } from "fs/promises";
import { Buffer } from "node:buffer";

import path from 'path';
import { fileURLToPath } from 'url';

/**
 * This File Contains the Logic for Updating An ICal File
 * */
export interface UpdateICalActionState {
    message: string;
    response: {
        formData?: FormData;
        exported?: object;
        mainSource?: {
            oldSource?: object;
            newSource?: object;
        },
        downloadHref?: string;
        filename?: string;
    };
    errors?: {
        icalSource?: string[];
        importType?: string[];
    }
    pState?: SessionDataState;
};

export const updateICalAction = async(
    prevState: UpdateICalActionState,
    form: FormData,
    generateAudit = true
): Promise<UpdateICalActionState> => {
    console.log("updateICalAction", form);
    const
        coid = prevState.pState?.profile?.org.id as string,
        cid = prevState.pState?.loggedInUser?.userId as string,
        sid = prevState.pState?.loggedInUser?.sessionId as string,
        ownerType = prevState.pState?.loggedInUser?.orgRole as string,
        importType = form.get("ical.importType") as string,
        userInput = {
            importType,
            icalSource: importType === "link" ?
                form.get("ical.href") as string :
                form.get("ical.href") as File
        };

    // Track Audit Actions
    let actionsTaken: string[] = [];

    // Input Validation Check
    if(importType === "link") {
        const validatedFields = ICalSchema_LINK.safeParse(userInput);
        if(!validatedFields?.success) {
            return {
                message: "Please resolve the form errors and re-submit.",
                response: {},
                errors: validatedFields?.error?.flatten()?.fieldErrors
            } as UpdateICalActionState;
        }
    } else if (importType === "file") {
        const validatedFields = ICalSchema_FileUpload.safeParse(userInput);
        if(!validatedFields?.success) {
            return {
                message: "Please resolve the form errors and re-submit.",
                response: {},
                errors: validatedFields?.error?.flatten()?.fieldErrors
            } as UpdateICalActionState;
        }
    }

    // Process Updates
    if(importType === "link") {
        const
            existingResource = await db.iCalEntry.findFirst({
                where: {
                    id: form.get("ical.id") as string
                },
                select: {
                    id: true,
                    icalFilename: true,
                    icalUrl: true,
                    dateBlocks: true,
                    dateBlockConflicts: true,
                    propertyId: true,
                    Calendar: {
                        select: {
                            id: true,
                        }
                    },
                    CronService: {
                        select: {
                            id: true,
                        }
                    }
                }
            }),
            userUploadingNewSource = existingResource?.icalUrl !== userInput.icalSource;

        // Provision PID, CID, and CRID
        form.set("ical.property.id", existingResource?.propertyId ?? "");
        form.set("ical.calendar.id", existingResource?.Calendar.id ?? "");
        form.set("ical.cron.id", existingResource?.CronService.id ?? "");

        if(userUploadingNewSource) {
            const  icalUrl = importType === "link" ?
                    form.get("ical.href") as string :
                    "",
                icalFilenameParts = icalUrl.split("/"),
                newResourceICalFilename = icalFilenameParts[icalFilenameParts.length - 1];

            // Delete ICalEntry
            const deletedICalResourceResponse = await db.iCalEntry.delete({
                where: {
                    id: existingResource?.id
                },
                select: {
                    id: true,
                    icalFilename: true,
                    icalUrl: true,
                    dateBlocks: true,
                    dateBlockConflicts: true,
                }
            });

            console.log("About to process ICal Addition? ", form);
            // Process and Upload New ICal From Form
            const { response: newICalResourceResponse, message, errors } = await createICalAttachmentActionFromForm(
                    { pState: prevState.pState } as CreateICalAttachmentActionState,
                    form,
                    false
            );

            console.log("Response? ", newICalResourceResponse, message, errors);

            actionsTaken = [
                `ICal Updated From: ${deletedICalResourceResponse?.icalFilename || "No Data"}`,
                `To: ${newResourceICalFilename}`,
                `Events Removed: ${deletedICalResourceResponse?.dateBlocks.length || 0}`,
                `Conflicts Removed: ${deletedICalResourceResponse?.dateBlockConflicts.length || 0}`,
                `Events Recorded: ${newICalResourceResponse?.processedDateBlockCount || 0}`,
                `Conflicts Recorded: ${newICalResourceResponse?.processedConflictCount || 0}`
            ];
        } else {
            const // Probe URL For Same URL Source
                freshPullDateBlocks = await processDateBlocksFromURL(
                    [],
                    existingResource?.icalUrl || "",
                    form.get("ical.calendar.id") as string,
                    form.get("ical.property.id") as string,
                    cid,
                    coid,
                    existingResource?.id,
                    ownerType
                );

            const // Compile A List of All Ids in the DateBlock and Conflict Tables and Merge EventUIDs for comparison.
                dbConflictIdListResponse = await db.dateBlockConflict.findMany({
                    where: {
                        iCalEntryId: existingResource.id
                    },
                    select: {
                        eventUID: true
                    }
                }),
                dbDateBlockIdListResponse = await db.dateBlock.findMany({
                    where: {
                        iCalEntryId: existingResource.id
                    },
                    select: {
                        eventUID: true
                    }
                }),
                mergedExistingIds = [
                    ...dbDateBlockIdListResponse.map(item => item.eventUID),
                    ...dbConflictIdListResponse.map(item => item.eventUID),
                ];

            const mergedFreshIds = [
                ...freshPullDateBlocks.map(item => item.eventUID),
            ];

            const // First Find Additions
                addEvents = freshPullDateBlocks
                    .filter(item => !mergedExistingIds.includes(item.eventUID)),
                // IdListFiltered Finds Removals
                removeEvents = mergedExistingIds.filter((item) => !mergedFreshIds.includes(item));

            if (// If Results are 0, there were no changes to the ICal File since upload or last pull.
                (!addEvents || addEvents.length) === 0 &&
                (!removeEvents || removeEvents.length) === 0
            ) {
                actionsTaken = [
                    `Updates From ICal: ${existingResource.icalFilename || "No Data"}`,
                    `No Changes Detected Since Last Upload or Pull`,
                ];
            } else {
                actionsTaken = [`Updates From ICal: ${existingResource.icalFilename}`];

                // Process Deletes First
                const { response: removeExistingEventsResponse } = await removeExistingEvents(removeEvents, actionsTaken);
                actionsTaken = removeExistingEventsResponse.actionsTaken;

                // Process Additions Next
                const { response: addNewEventsResponse } = await addNewEvents(addEvents, existingResource.id, actionsTaken);
                actionsTaken = addNewEventsResponse.actionsTaken;
            }

            await db.iCalEntry.update({
                where: {
                    id: existingResource.id
                },
                data: {
                    updatedAt: new Date()
                }
            });
        }
    } else if (importType === "file") {
        console.log("File Uploaded For Update...");
    }

    // Generate Audit
    if(generateAudit) {
        const auditData = compileUserAuditObject(
            actionsTaken, "update.action", "ical",
            coid, cid, sid
        );
        createUserAuditAction_BackgroundProcess(auditData).then(() => {});
    }

    return {
        message: "The iCal Resource has been successfully updated!",
        response: {},
        pState: prevState.pState
    } as UpdateICalActionState;
};

export const changeMainSourceICalAction = async(
    prevState: UpdateICalActionState,
    form: FormData,
): Promise<UpdateICalActionState> => {
    const
        currentMainSourceId = form.get("ical.source.current") as string,
        newMainSourceId = form.get("ical.source.new") as string;

    // Reset ICal Main Source
    const oldSource = await db.iCalEntry.update({
        where: {
            id: currentMainSourceId,
        },
        data: {
            isMainSrc: false,
        }
    });

    // Set New Source
    const newSource = await db.iCalEntry.update({
        where: {
            id: newMainSourceId,
        },
        data: {
            isMainSrc: true,
        }
    });

    return {
        message: "The Main Source has been successfully updated!",
        response: {
            mainSource: {
                oldSource,
                newSource
            }
        },
        pState: prevState.pState
    } as UpdateICalActionState;
};

export const exportLNSICalAction = async(
    prevState: UpdateICalActionState,
    form: FormData,
): Promise<UpdateICalActionState> => {
    const
        mainList = Object.fromEntries(form),
        compiledList: string[] = [];

    const processValueForKey =
        (key: string) => compiledList.push(mainList[`${key}.id`] as string);

    for(const [key, value] of Object.entries(mainList)) {
        if(value === "on") processValueForKey(key);
    }

    const extracts = await db.dateBlock.findMany({
        where: {
            iCalEntryId: {
                in: compiledList
            }
        },
        include: {
            UserImprint: {
                select: {
                    firstName: true,
                    lastName: true,
                    appRole: true
                }
            }
        }
    });

    const
        lnsStampedBeginHeaders = [
            "BEGIN:VCALENDAR",
            "PRODID:-//LNS//SERVICER//EN-US",
            "VERSION:2.0"
        ],
        lnsStampedEndHeaders = ["END:VCALENDAR"],
        lnsRecordedEvents: string[] = [];

    extracts.map((item) => {
        lnsRecordedEvents.push("BEGIN:VEVENT");
        lnsRecordedEvents.push(`DTSTAMP:${lnsExportCreateDateToICSFormat({ date: item.eventCreated })}`);
        lnsRecordedEvents.push(`DTSTART:${lnsExportDateToICSFormat({ date: item.startDate })}`);
        lnsRecordedEvents.push(`DTEND:${lnsExportDateToICSFormat({ date: item.endDate })}`);
        lnsRecordedEvents.push(`UID:${item.id}@lns-bookings.com`);
        lnsRecordedEvents.push(`SUMMARY:${item.propertyName} is Blocked`);
        lnsRecordedEvents.push(`DESCRIPTION:BOOKING|${item.UserImprint.firstName}${item.UserImprint.lastName}|${item.UserImprint.appRole}`);
        lnsRecordedEvents.push("END:VEVENT");
        return item;
    });

    const compiledExportableData = [
        ...lnsStampedBeginHeaders,
        ...lnsRecordedEvents,
        ...lnsStampedEndHeaders
    ];

    const
        __filename = fileURLToPath(import.meta.url),
        __output_dirname = path.dirname(__filename).replace("src/actions/ical", "public/tmp/"),
        filenameIdParts = extracts[0]?.propertyId?.split("-") ?? "",
        filenameId = filenameIdParts[filenameIdParts.length - 1],
        filenameTS = new Date().getTime(),
        finalFilename = `${extracts[0].coid}.lnse.${filenameTS}-${filenameId}.ics`,
        bufferString = Buffer.from(compiledExportableData.join("\n")),
        content = new Uint8Array(bufferString);

    await writeFile(__output_dirname + finalFilename, content);

    return {
        message: "Data Ready For Streaming...",
        response: {
            dataToStream: compiledExportableData,
            filename: finalFilename,
            downloadHref: "/tmp/" + finalFilename
        },
        pState: prevState.pState
    } as UpdateICalActionState;
};