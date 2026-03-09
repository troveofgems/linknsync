"use client";
import Form from "next/form";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";

import React, {SetStateAction, useActionState, useEffect} from "react";
import {Textarea} from "@/components/ui/textarea";
import {
    CreateSendEmailActionState,
    createSendJobOppEmailAction
} from "@/actions/email/send.action";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {useFormStatus} from "react-dom";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";

export const JobOpportunityForm = (
    {
        handleDialogClose,
    }: {
        handleDialogClose: React.Dispatch<SetStateAction<boolean>>;
    }) => {
    const now = datetimeConversionTo_String({ timestamp: new Date()});

    const
        [state, action, isPending] = useActionState(
            createSendJobOppEmailAction,
            {} as CreateSendEmailActionState
        );

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "Email Successfully Sent!") {
                handleDialogClose(true);
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
            }
        }
    }, [state, isPending, handleDialogClose]);

    return (
        <Form id={"jobOpportunityForm"} action={action}>
            <p className={"lightDarkFormText"}>Currently: {now}</p>
            <div className={"w-full"}>
                <GenericTextInput
                    setAsInputTextField={true}
                    label={"Who Are You?"}
                    showAsRequired={true}
                    placeholder={"Company or Personal Name"}
                    name={"contactName"}
                    id={"contactName"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput"}
                    /*fieldErrorMessage={((typeof formState?.errors?.name === "object" && formState?.errors?.name?.join("\n")) || undefined)}*/
                />
                <GenericTextInput
                    setAsInputTextField={true}
                    label={"Your Contact"}
                    showAsRequired={true}
                    placeholder={"Email or Phone Number"}
                    name={"contactMethod"}
                    id={"contactMethod"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput"}
                    /*fieldErrorMessage={((typeof formState?.errors?.homepageLink === "object" && formState?.errors?.homepageLink?.join("\n")) || undefined)}*/
                />
                <GenericTextInput
                    label={"Link to Company Homepage"}
                    showAsRequired={false}
                    placeholder={"https://www.thetroveofgems.tech"}
                    name={"companyHomepage"}
                    id={"companyHomepage"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput"}
                    /*fieldErrorMessage={((typeof formState?.errors?.homepageLink === "object" && formState?.errors?.homepageLink?.join("\n")) || undefined)}*/
                />
                <div className="mt-8 grid w-full gap-3">
                    <label htmlFor="message" className={"lightDarkFormText"}>The Opportunity:</label>
                    <Textarea
                        id={"notes-textarea"}
                        name={"opportunityNotes"}
                        className={"formInput"}
                        placeholder="Please provide some details about the job opportunity you might have for me! Thank you for taking the time to reach out to me!"
                        required={true}
                    />
                </div>
            </div>
            <div className={"flex mt-5 justify-center"}>
                <FormButton
                    btnType={"submit"}
                    classNames={"button-87"}
                    btnLabel={"Send Email"}
                    pendingMessage={"Building & Sending Email..."}
                    useFormStatus={useFormStatus}
                />
            </div>
        </Form>
    );
}