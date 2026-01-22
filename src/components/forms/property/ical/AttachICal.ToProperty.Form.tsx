'use client';
import React, {useActionState, useState, useEffect} from "react";
import {useParams} from "next/navigation";

// Components
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";

// Actions, Constants, Hooks, & Utils
import {
    CreateICalAttachmentActionState,
    createICalAttachmentActionFromForm
} from "@/actions/ical/create.action";
import {SessionDataState} from "@/store/userStore";
import {Alert} from "@/components/misc/Sonner.Alerter";

import {useRouter} from "next/navigation";
import {ListICalsFromProperty} from "@/components/forms/property/ical/ListICals.FromProperty";
import {APP_PATHS} from "@/constants/nav.path.constants";
import {useFormStatus} from "react-dom";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";

export const AttachICalToPropertyForm = (
    {
        user
    }: {
        user: SessionDataState
    }
) => {
    const
        { viewPropertyList } = APP_PATHS.authenticatedPages.appUser.goToProperty,
        router = useRouter(),
        urlParams = useParams(),
        [pid, setPID] = useState<string | null>(null);

    const [state, action, isPending] = useActionState(
        createICalAttachmentActionFromForm,
        { pState: user } as CreateICalAttachmentActionState
    );

    // Url Changes
    useEffect(() => {
        if(!!urlParams.pid) {
            setPID(urlParams.pid as string);
        }
    }, [urlParams, pid]);

    // Form Action Changes
    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "The iCal Resource has been successfully created and linked to the property!") {
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                return router.push(viewPropertyList.path);
            }
        }
    }, [state, isPending, router, viewPropertyList]);

    console.log("ADD ICAL: ");

    return (
        <form action={action}>
            <h2 className={"text-1xl font-semibold capitalize"}>ICal Sources</h2>
            <DropdownMenuSeparator />

            <ListICalsFromProperty
                pid={urlParams.pid as string}
                user={user}
                page={"manage"}
                formState={state}
                useFormStatus={useFormStatus}
            />

            <GenericTextInput
                setAsHiddenField={true}
                name={"ical.property.id"}
                id={"ical.property.id"}
                value={pid as string}
            />
        </form>
    );
};