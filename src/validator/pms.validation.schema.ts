import {z} from "zod";

export type AttachOrUpdatePMSSchema = z.infer<typeof AttachOrUpdatePMSSchema>;

export const AttachOrUpdatePMSSchema = z.object({
    domain: z
        .string()
        .max(250, {message: "Domain Link must not be more than 250 characters."})
        .optional()
        .or(z.literal("")),
    apiKey: z
        .string()
        .max(250, {message: "API Key must not be more than 250 characters."})
        .optional()
        .or(z.literal("")),
    secretKey: z
        .string()
        .max(250, {message: "Secret Key must not be more than 250 characters."})
        .optional()
        .or(z.literal("")),
    blockReasonId: z
        .string()
        .max(2, {message: "Block Reason Id must not be more than 2 characters."})
        .optional()
        .or(z.literal(""))
});