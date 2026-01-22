import React from "react";

import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {useFormStatus} from "react-dom";
import {DeleteICalActionState} from "@/actions/ical/delete.action";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {SessionDataState} from "@/store/userStore";
import {ICalSource} from "@/components/forms/property/elements/CurrentSource";

export const ICalDeletion = (
    formState: DeleteICalActionState,
    icalSource: ICalSource,
    user: SessionDataState,
    lastSegmentOfId: string,
) => {
    const confirmationCode = `${user!.profile!.fullName.split(" ")[1]} - ${lastSegmentOfId}`;

    return (
        <div className={"w-full flex flex-wrap"}>
            <div className={"w-full"}>
                <GenericTextInput
                    setAsInputTextField={true}
                    label={"Delete Confirmation"}
                    showAsRequired={true}
                    placeholder={confirmationCode}
                    name={"code.deletion.confirmation"}
                    id={"code.deletion.confirmation"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput"}
                    fieldErrorMessage={formState?.errors?.deleteConfirmation?.join("\n") || undefined}
                />
                {
                    !!formState.errors && FormErrorMessage({ formState: formState as DeleteICalActionState })
                }
                <div className={"flex justify-center"}>
                    <FormButton
                        btnType={"submit"}
                        classNames={"button-87"}
                        btnLabel={"Remove Source ICal"}
                        pendingMessage={"Removing ICal From Property & Calendars..."}
                        useFormStatus={useFormStatus}
                    />
                </div>
            </div>
        </div>
    )
}