import React from "react";
import {CreatePropertyActionState} from "@/actions/property/create.action";
import {UpdatePropertyActionState} from "@/actions/property/update.action";
import {DeleteICalActionState} from "@/actions/ical/delete.action";
import {DeletePropertyActionState} from "@/actions/property/delete.action";
import {UpdateICalActionState} from "@/actions/ical/update.action";

export const FormErrorMessage = (
    {
        formState,
        overrideDefaultError = false
    }: {
        formState:
            CreatePropertyActionState | UpdatePropertyActionState | DeletePropertyActionState |
            UpdateICalActionState | DeleteICalActionState,
        overrideDefaultError?: boolean;
    }
) => (!!formState?.errors && !overrideDefaultError) ? (
    <div className={"flex flex-col w-full text-center my-5"}>
        <small className={"text-red-500"}>Error!</small>
        <small className={"text-red-500"}>{formState.message}</small>
    </div>
) : <>TODO: Create A More Involved Error Component</>;