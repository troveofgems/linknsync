"use client";
import React, {useActionState, useEffect} from "react";
import {useFormStatus} from "react-dom";
import {useRouter} from "next/navigation";

// Session State Type
import {SessionDataState} from "@/store/userStore";

// Components
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";

// Actions, Hooks, Utils
import {attachPMSAction, AttachPMSActionState} from "@/actions/pms/attach.action";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";

export const ConnectPMSForm = (
    {
        user,
        handleRefreshList
    } : {
        user: SessionDataState,
        handleRefreshList: React.Dispatch<React.SetStateAction<boolean>>,
    }) => {
    const
        router = useRouter(),
        [state, action, isPending] = useActionState(
            attachPMSAction,
            {
                pState: user,
                nonce: Buffer.from(crypto.randomUUID()).toString('base64')
            } as AttachPMSActionState
        );

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "PMS Successfully Attached!") {
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                handleRefreshList(true);
            }
        }
    }, [state, isPending, router, state.errors, handleRefreshList]);

    return (
        <form action={action} nonce={"some-nonce-value?"} className={"mt-10"}>
            <h2 className={"text-1xl font-semibold capitalize"}>Connect To Track</h2>
            <DropdownMenuSeparator />
            <div className={"flex flex-row flex-wrap"}>
                <div className={"w-1/5 mr-4"}>
                    <GenericTextInput
                        setAsInputTextField={true}
                        label={"Domain"}
                        showAsRequired={true}
                        placeholder={"https://{DOMAIN}.trackhs.com"}
                        name={"pms.domain"}
                        id={"pms.domain"}
                        defaultValue={state?.response?.formData?.get("pms.domain") as string || ""}
                        labelClassnames={"formLabel w-1/2"}
                        inputFieldClassnames={"formInput w-1/2"}
                        fieldErrorMessage={(state?.errors?.domain?.join("\n") ?? undefined)}
                    />
                </div>
                <div className={"w-1/5 mr-4"}>
                    <GenericTextInput
                        setAsInputTextField={true}
                        label={"API Key"}
                        showAsRequired={false}
                        placeholder={""}
                        name={"pms.apiKey"}
                        id={"pms.apiKey"}
                        defaultValue={state?.response?.formData?.get("pms.apiKey") as string || ""}
                        labelClassnames={"formLabel"}
                        inputFieldClassnames={"formInput"}
                        fieldErrorMessage={(state?.errors?.apiKey?.join("\n") || undefined)}
                    />
                </div>
                <div className={"w-1/5 mr-4"}>
                    <GenericTextInput
                        setAsInputTextField={true}
                        label={"Secret Key"}
                        showAsRequired={false}
                        placeholder={""}
                        name={"pms.secretKey"}
                        id={"pms.secretKey"}
                        defaultValue={state?.response?.formData?.get("pms.secretKey") as string || ""}
                        labelClassnames={"formLabel"}
                        inputFieldClassnames={"formInput"}
                        fieldErrorMessage={(state?.errors?.secretKey?.join("\n") || undefined)}
                    />
                </div>
                <div className={"w-1/5 mr-4"}>
                    <GenericTextInput
                        setAsInputTextField={true}
                        label={"Block Reason Id"}
                        showAsRequired={false}
                        placeholder={""}
                        name={"pms.blockReasonId"}
                        id={"pms.blockReasonId"}
                        defaultValue={state?.response?.formData?.get("pms.blockReasonId") as string || ""}
                        labelClassnames={"formLabel"}
                        inputFieldClassnames={"formInput"}
                        fieldErrorMessage={(state?.errors?.blockReasonId?.join("\n") || undefined)}
                    />
                </div>
                <div className={"flex mt-10 justify-center"}>
                    <FormButton
                        btnType={"submit"}
                        classNames={"button-87"}
                        btnLabel={"Attach"}
                        pendingMessage={"Creating PMS Profile..."}
                        useFormStatus={useFormStatus}
                    />
                </div>
            </div>
            {
                (state?.errors !== undefined) && <FormErrorMessage formState={state} />
            }
        </form>
    );
};