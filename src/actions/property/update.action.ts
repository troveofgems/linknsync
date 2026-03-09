"use server";
import db from "@/db/connect.db";
import {ZodError} from "zod";
import {SessionDataState} from "@/store/userStore";
import {AttachedPMS, SupportedCountries} from "@prisma/client";
import {optionSelected} from "@/utils/bool.utils";

/**
 * This File Contains the Logic for Updating a Property
 * */
export type UpdatePropertyActionState = {
    message: string;
    response: {
        propertyValidation?: {
            success: boolean;
            data?: {
                name: string;
                homepageLink?: string;
                thumbnail: string;
                cid: string;
            };
            error?: ZodError;
        };
        generated?: {
            updated: boolean;
        };
        formData?: FormData;
    };
    errors?: {
        name?: string[];
        homepageLink?: string[];
        thumbnail?: string[];
        street?: string[];
        street2?: string[];
        street3?: string[];
        state?: string[];
        city?: string[];
        postalCode?: string[];
        icalSource?: string[];
    };
    pState?: SessionDataState | null;
    pid?: string;
    nonce?: string;
};

export const updatePropertyAction = async(
    prevState: UpdatePropertyActionState,
    form: FormData,
): Promise<UpdatePropertyActionState> => {
    const
        basicUpdates = {
            name: form.get("property.name") as string,
            homepageLink: form.get("property.homepageLink") as string
        },
        advancedUpdates: {
            archived?: boolean;
            archivedAt?: Date;
            trackUnitId?: string;
            attachedPMSId?: string;
        } = {};

    // Marked Archived?
    const propertyHasBeenArchived = optionSelected(form.get("property.hasBeenArchived") as string);
    if(propertyHasBeenArchived) {
        const
            serverTS = new Date(),
            intendedArchivalTS = new Date(serverTS);

        intendedArchivalTS.setDate(intendedArchivalTS.getDate() + 7);
        advancedUpdates.archived = true;
        advancedUpdates.archivedAt = intendedArchivalTS;
    }

    // Marked As Connected To A Servicer
    const servicerConnected = optionSelected(form.get("property.servicer.tns.connected") as string);
    const trackUnitId = form.get("property.servicer.tns.unitId") as string;
    if(servicerConnected) {
        const { id: trackId } = await db.attachedPMS.findFirst({
            where: {
                pmsName: "Track"
            }
        }) as Partial<AttachedPMS>;
        advancedUpdates.trackUnitId = trackUnitId;
        advancedUpdates.attachedPMSId = trackId;
    }

    // Update Property Detail
    const propertyUpdates = await db.property.update({
        where: {
            id: prevState.pid
        },
        data: { ...basicUpdates, ...advancedUpdates }
    });

    const updatedAddressData = {
        isMUA: form.get("address.isMUA") as string === "on",
        street: form.get("address.street") as string,
        street2: form.get("address.street2") as string || "",
        street3: form.get("address.street3") as string || "",
        state: form.get("address.state") as string,
        city: form.get("address.city.selected") as string,
        postalCode: form.get("address.postalCode") as string,
        country: form.get("address.country") as SupportedCountries,
    };

    // Handle Custom Entered Cities
    if(form.get("address.locationNotListed") === "on") {
        updatedAddressData.city = form.get("address.city.custom") as string;
    }

    const addressUpdates = await db.address.update({
       where: {
           propertyId: prevState.pid
       },
        data: updatedAddressData
    });

    return {
        message: "Property Successfully Updated!",
        response: {
            updates: {
                property: propertyUpdates,
                address: addressUpdates
            }
        }
    } as UpdatePropertyActionState;
}