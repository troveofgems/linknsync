"use server";
import db from "@/db/connect.db";
import {SessionDataState} from "@/store/userStore";

/**
 * This File Contains the Logic for Deleting a Property
 * */
export type DeletePropertyActionState = {
    message: string;
    response?: {
        deletedProperty?: boolean;
    }
    errors?: Error;
    pState?: SessionDataState
};

export const deletePropertyAction = async(
    prevState: DeletePropertyActionState,
    form: FormData
): Promise<DeletePropertyActionState> => {
    console.log("Delete From: ", form);
    const propertyId = form.get("property.id") as string;

    // Cascade Delete?
    const deletedProperty = await db.property.delete({
        where: {
            id: propertyId
        }
    });

    console.log("Deleted Property: ", deletedProperty);

    return {
        message: "The Property And All Associated Data Have Been Deleted!",
        response: {
            deletedProperty: true
        },
        pState: prevState?.pState
    } as DeletePropertyActionState;
}