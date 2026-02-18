import {z} from "zod";

export type CreateOrUpdatePropertySchema = z.infer<typeof CreateOrUpdatePropertySchema>;

export const CreateOrUpdatePropertySchema = z.object({
    name: z.string()
        .min(4, {
            message: "Property Name must be greater than 4 characters long",
        })
        .max(250, {
            message: "Property Name must not be more than 250 characters.",
        }),
    homepageLink: z.string().url({ message: "Invalid URL Format" }).max(250, {
        message: "HomePage Link must not be more than 250 characters.",
    }).optional().or(z.literal("")),
    cid: z.string(),
    coid: z.string()
});