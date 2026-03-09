'use server';
import db from "@/db/connect.db";
import {AddressSchema, AddressSchemaObj} from "@/validator/address.validation.schema";
import {ZodError} from "zod";
import {SupportedCountries} from "@/lib/utils/Address/address.utils";
import {SessionDataState} from "@/store/userStore";

export interface CreateAddressActionState {
    message: string;
    response: {
        generatedAddressId?: string;
        addressValidation?: {
            success: boolean;
            data?: unknown;
            error?: ZodError;
        };
    },
    errors?: {
        [p: string]: string[];
    },
    pState?: SessionDataState
}

export type CreateAddressProps = {
    isMUA: boolean;
    city: string;
    postalCode: string;
    state: string;
    country: SupportedCountries;
    street: string;
    street2?: string;
    street3?: string;
    Property: {
        connect: {
            id: string;
        }
    }
}

export const createAddressAction = async(
    prevState: CreateAddressActionState,
    address: CreateAddressProps,
): Promise<CreateAddressActionState> => {
    const { id: generatedAddressId } = await db.address.create({
        data: { ...address }
    });

    return {
        message: "Address Successfully Created & Linked To Property",
        response: {
            generatedAddressId
        },
        pState: prevState?.pState
    }
}

export const validateAddressAction = async(
    prevState: CreateAddressActionState,
    address: AddressSchema
): Promise<CreateAddressActionState> => ({
    message: "Address Validated",
    response: {
        addressValidation: AddressSchemaObj.safeParse(address)
    },
    pState: prevState?.pState
});