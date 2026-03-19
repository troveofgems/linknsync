'use server';
import db from "@/db/connect.db";

import {CreateOrUpdatePropertySchema} from "@/validator/property.validation.schema";
import {
    createAddressAction,
    CreateAddressActionState,
    CreateAddressProps,
    validateAddressAction
} from "@/actions/address/create.action";
import {createCalendarAction, CreateCalendarActionState} from "@/actions/calendar/create.action";
import {createCronServiceAction, CreateCronServiceActionState} from "@/actions/cronService/create.action";
import {
    createICalAttachmentAction,
    CreateICalAttachmentActionState, CreateICalAttachmentProps,
    validateICalAction
} from "@/actions/ical/create.action";
import {ZodError} from "zod";
import { createUserAuditAction_BackgroundProcess } from "@/actions/audit/user/create.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {SessionDataState} from "@/store/userStore";
import {Prisma, SupportedCountries} from "@prisma/client";
import { imgbbUpload } from "imgbb-image-uploader";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

/**
 * This File Contains the Logic for Creating a Property
 * */
export type CreatePropertyProps = {
    name?: string;
    homepageLink?: string;
    thumbnail?: string;
    cid: string;
    coid: string;
};
export interface CreatePropertyActionState {
    message: string;
    response: {
        propertyValidation?: {
            success: boolean;
            data?: {
                name?: string;
                homepageLink?: string;
                thumbnail?: string;
                cid: string;
                coid: string;
            };
            error?: ZodError;
        };
        formData?: FormData,
        generated?: {
            propertyId: string;
            addressId: string;
            calendarId: string;
            cronServiceId: string;
            icalResourceId: string;
            processedDateBlockCount: number;
            processedConflictCount: number;
        }
    };
    errors?: {
        name?: string[];
        homepageLink?: string[];
        icalSource?: string[];
        street?: string[];
        street2?: string[];
        street3?: string[];
        state?: string[];
        city?: string[];
        postalCode?: string[];
        processing?: Error | PrismaClientValidationError,
    };
    pState?: SessionDataState | null;
    formState?: never;
    nonce?: string;
}

export const createPropertyAction = async(
    prevState: CreatePropertyActionState,
    formData: FormData,
    generateAudit = true
): Promise<CreatePropertyActionState> => {
    const setFileName = (file: File) => {
        return file.name;
    }

    const // Owner Data
        { loggedInUser, profile } = prevState.pState as SessionDataState,
        coid = profile!.org.id,
        cid  = loggedInUser!.userId!,
        sid = loggedInUser!.sessionId!;

    try {
        const // Variable Extraction
            property = {
                name: formData.get("property.name") as string,
                homepageLink: formData.get("property.homepageLink") as string,
                cid,
                coid,
            },
            country = formData.get("address.country") as string,
            address = {
                isMUA: formData.get("address.isMUA") as string === "on",
                street: formData.get("address.street") as string,
                street2: formData.get("address.street2") as string || "",
                street3: formData.get("address.street3") as string || "",
                city: formData.get("address.city.selected") as string,
                state: formData.get("address.state") as string,
                postalCode: formData.get("address.postalCode") as string,
                country: country as SupportedCountries,
            },
            importType = formData.get("ical.importType") as string,
            icalSourceValidation = importType === "link" ? ({
                importType,
                icalSource: formData.get("ical.href") as string
            }) : ({
                importType,
                icalSource: formData.get("ical.file") as File
            }),
            icalSlug = formData.get("ical.slug") as string,
            icalUrl = importType === "link" ?
                formData.get("ical.href") as string :
                setFileName(formData.get("ical.file") as File),
            icalFilenameParts = importType === "link" ? icalUrl?.split("/") : "noNameProvided";

        let icalFilename = icalFilenameParts[icalFilenameParts.length - 1];

        // Handle Custom Entered Cities
        if(formData.get("address.locationNotListed") === "on") {
            address.city = formData.get("address.city.custom") as string;
        }

        const // Validation of Data
            validatedPropertyFields = await validatePropertyAction(
                {} as CreatePropertyActionState,
                property
            ),
            validatedAddressFields = await validateAddressAction(
                {} as CreateAddressActionState,
                address
            ),
            validatedICalFields = await validateICalAction(
                {} as CreateICalAttachmentActionState,
                icalSourceValidation
            );

        if( // Validation Catch
            !validatedPropertyFields?.response?.propertyValidation?.success ||
            !validatedAddressFields?.response?.addressValidation?.success ||
            !validatedICalFields?.response?.validatedICalResource?.success
        ) {
           const
               propertyFieldErrors = validatedPropertyFields?.response?.propertyValidation?.error,
               addressFieldErrors = validatedAddressFields?.response?.addressValidation?.error,
               icalFieldErrors = validatedICalFields?.response?.validatedICalResource?.error;

            return {
                message: "Please resolve the form errors and re-submit.",
                response: {
                    formData
                },
                errors: {
                    ...propertyFieldErrors?.flatten().fieldErrors,
                    ...addressFieldErrors?.flatten().fieldErrors,
                    ...icalFieldErrors?.flatten()?.fieldErrors,
                },
                pState: prevState.pState,
                prevState
            } as unknown as CreatePropertyActionState;
        }

        // => Validation Passed, Continue Building Resources to DB.
        // Create Property In Prisma
        const { id: generatedPropertyId } = await db
            .property
            .create({
                data: {
                    name: validatedPropertyFields.response.propertyValidation.data?.name as string,
                    homepageLink: validatedPropertyFields.response.propertyValidation.data?.homepageLink as string,
                    cid: validatedPropertyFields.response.propertyValidation.data?.cid as string,
                    coid: validatedPropertyFields.response.propertyValidation.data?.coid as string
                }
            });

        // Process Photo Data
        let imgUploaderResponse = null;

        const
            imageData = formData.get("property.thumbnail") as File,
            imageUploadedByUser = imageData.size > 0;

        if(imageUploadedByUser) {
            try {
                const imgUploaderOptions = {
                        key: process.env.IMG_BB_API_KEY as string,
                        image: imageData,
                    };

                imgUploaderResponse = await imgbbUpload(imgUploaderOptions);

                if(imgUploaderResponse.status === 200) {
                    const
                        {
                            title, width, height, size, delete_url
                        } = imgUploaderResponse.data,
                        {
                            mime, extension, url
                        } = imgUploaderResponse.data.image;

                    const photo = {
                        title: `${title}`,
                        width: `${width}`,
                        height: `${height}`,
                        size: parseInt(size),
                        mime: `${mime}`,
                        ext: `${extension}`,
                        srcUrl: `${url}`,
                        thumbnailUrl: `${imgUploaderResponse.data?.thumb?.url}`,
                        mediumUrl: `${imgUploaderResponse.data?.medium?.url}`,
                        deleteUrl: `${delete_url}`,
                        propertyId: generatedPropertyId
                    };

                    await db.photo.create({
                        data: { ...photo }
                    });
                }
            } catch(error) {
                console.warn("Error Processing Image, Continuing Anyway: ", error);
            }
        }

        // Create Address & Link To Property
        const { response: { generatedAddressId } } = await createAddressAction(
            {} as CreateAddressActionState,
            {
                ...validatedAddressFields.response.addressValidation.data as CreateAddressProps,
                Property: {
                    connect: {
                        id: generatedPropertyId,
                    }
                }
            }
        );

        // Create Calendar & Link To Property
        const { response: { generatedCalendarId } } = await createCalendarAction(
            {} as CreateCalendarActionState,
            {
                coid: property.coid,
                Property: {
                    connect: {
                        id: generatedPropertyId
                    }
                }
            }
        );

        // Create CronService & Link To Property, Calendar
        const { response: { generatedCronServiceId } } = await createCronServiceAction(
            {} as CreateCronServiceActionState,
            {
                coid: property.coid,
                Property: {
                    connect: {
                        id: generatedPropertyId
                    }
                },
                Calendar: {
                    connect: {
                        id: generatedCalendarId
                    }
                }
            }
        );

        // Create ICal Resource & Process DateBlocks/Conflicts
        let importFile: File | undefined = undefined;
        if(importType === "file") {
            importFile = formData.get("ical.file") as File;
            icalFilename = importFile.name;
        }

        console.log("ICAL Slug? ", formData);

        const
            {
            response: {
                generatedICalResourceId,
                processedDateBlockCount,
                processedConflictCount
            }
        } = await createICalAttachmentAction(
            { pState: prevState.pState } as CreateICalAttachmentActionState,
            {
                importType,
                icalUrl,
                icalFilename,
                slug: icalSlug,
                propertyId: generatedPropertyId,
                isMainSrc: true,
                Calendar: {
                    connect: { id: generatedCalendarId }
                },
                CronService: {
                    connect: { id: generatedCronServiceId }
                },
                UserImprint: {
                    connect: { id: cid }
                }
            } as CreateICalAttachmentProps,
                coid,
                importFile
        );

        // System Audit Log Background Process
        if(generateAudit) {
            const
                actionsTaken = [
                    "Property Created",
                    `${property.name}`,
                    "Address Stored",
                    "Calendar Created",
                    "Cron Service Created",
                    `ICal Attached: ${icalFilename}`,
                    "ICal Events Processed",
                    `Events Recorded: ${processedDateBlockCount}`,
                    `Conflicts Recorded: ${processedConflictCount}`,
                ],
                auditData = compileUserAuditObject(
                    actionsTaken, "create.action", "property",
                    coid, cid, sid
                );
            createUserAuditAction_BackgroundProcess(auditData).then(() => {});
        }

        return {
            message: "Property Successfully Created!",
            response: {
                generated: {
                    propertyId: generatedPropertyId,
                    addressId: generatedAddressId || "",
                    calendarId: generatedCalendarId,
                    cronServiceId: generatedCronServiceId,
                    icalResourceId: generatedICalResourceId || "",
                    processedDateBlockCount: processedDateBlockCount || 0,
                    processedConflictCount: processedConflictCount || 0,
                }
            }
        };
    } catch(error) {
        return {
            message: 'Error Creating Property',
            response: {},
            errors: {
                processing: error as Error
            },
            pState: prevState.pState
        };
    }
};

export const validatePropertyAction = async(
    prevState: CreatePropertyActionState,
    property: CreatePropertyProps
): Promise<CreatePropertyActionState> => ({
    message: "Validating Property...",
    response: {
        propertyValidation: CreateOrUpdatePropertySchema.safeParse(property)
    },
    pState: prevState.pState
});