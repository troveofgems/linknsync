import {z} from "zod";
//export type UploadFileType = typeof ACCEPTED_FILE_TYPES[number];

/**
 * Constants and Helper Functions
 * */
const
    ACCEPTED_FILE_TYPES = ["file", "link"] as const,
    FILE_CONSTRAINTS = {
        SIZE_LIMIT: 1024 * 1024, // 1MB
        MIME_TYPE: "text/calendar"
    } as const;

const importType = z.enum(ACCEPTED_FILE_TYPES);

export const ICalSchema_LINK = z.object({
    icalSource: z.string()
        .url("Please provide a URL")
        .refine((url) => url.endsWith(".ics"), {
            message: "URL must end with '.ics'"
        }),
    importType
});

export const ICalSchema_FileUpload = z.object({
    icalSource: z.instanceof(File)
        .refine((file) => [`${FILE_CONSTRAINTS.MIME_TYPE}`].includes(file.type), {
            message: "File upload failed. Please upload an .ics file and resubmit the form."
        })
        .refine((file) => file.size <= FILE_CONSTRAINTS.SIZE_LIMIT, {
            message: "File size cannot exceed 1MB."
        }),
    importType
});

export const DeleteICalSchema = z
    .object({
        deleteConfirmation: z
            .string()
            .max(100, {
                message: "Confirmation String must not be more than 100 characters"
            }),
        generatedDeleteConfirmationCode: z
            .string()
            .max(100, {
                message: "Send an Email to the System Administrator For Assistance, Please Reference: Error Code 1100"
            }),
    })
    .refine((data) => data.deleteConfirmation === data.generatedDeleteConfirmationCode, {
        message: "Delete Confirmation Codes Do Not Match",
        path: ["deleteConfirmation"]
    });