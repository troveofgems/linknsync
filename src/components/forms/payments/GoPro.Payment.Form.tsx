"use client";
import "./CreateProperty.Form.scss";
import React, {useActionState, useEffect} from "react";
import {useFormStatus} from "react-dom";
import {useRouter} from "next/navigation";

// Session State Type
import {SessionDataState} from "@/store/userStore";

// Components
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";

// Actions, Hooks, Utils
import {createPropertyAction, CreatePropertyActionState} from "@/actions/property/create.action";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {APP_PATHS} from "@/utils/nav.path.utils";

export const GoProPaymentForm = (
    {
        user
    } : {
        user: SessionDataState
    }) => {
    const
        router = useRouter(),
        [state, action, isPending] = useActionState(
            createPropertyAction,
            {
                pState: user,
                nonce: Buffer.from(crypto.randomUUID()).toString('base64')
            } as CreatePropertyActionState
        );

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "Successfully Subscribed to Pro Services!") {
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                const propertyListPath = APP_PATHS.pages.authenticated.user.goToProperty.list.path as string;
                return router.push(propertyListPath);
            }
        }
        console.log(state);
    }, [state, isPending, router]);

    return (
        <form action={action} nonce={"some-nonce-value?"}>
            <h2 className={"text-1xl font-semibold capitalize"}>Subscribe To Pro</h2>
            <DropdownMenuSeparator />
            <div className={"flex"}>
                <div className={"w-1/2"}>
                    Stripe Payment Component Here
                </div>
            </div>

            <div className={"flex mt-10 justify-center"}>
                <FormButton
                    btnType={"submit"}
                    classNames={"button-87"}
                    btnLabel={"Submit"}
                    pendingMessage={"Making Payment..."}
                    useFormStatus={useFormStatus}
                />
            </div>
            {
                (state?.errors !== undefined) && <FormErrorMessage formState={state} />
            }
        </form>
    );
};