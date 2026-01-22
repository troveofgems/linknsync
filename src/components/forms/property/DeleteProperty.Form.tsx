import React, {useActionState, useEffect} from "react";
import {useFormStatus} from "react-dom";

// Stores and Types
import {SessionDataState} from "@/store/userStore";

// Components
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {deletePropertyAction, DeletePropertyActionState} from "@/actions/property/delete.action";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {Alert} from "@/components/misc/Sonner.Alerter";
//import {APP_PATHS} from "@/constants/nav.path.constants";

export const DeletePropertyForm = (
    {
        user,
        propertyId,
        handleDialogClose
    } : {
        user: SessionDataState;
        propertyId: string;
        handleDialogClose: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
    const
        [state, action, isPending] = useActionState(
            deletePropertyAction,
            {} as DeletePropertyActionState
        ),
        idSegments = propertyId.split("-"),
        lastSegmentOfId = idSegments[idSegments.length - 1];

    useEffect(() => {
        if(!!state && !isPending) {
            console.log("Message: ", state);
            if(!!state && !!state.message && state.message === "The Property And All Associated Data Have Been Deleted!") {
                handleDialogClose(false);
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                //return router.push(APP_PATHS.authenticatedPages.appUser.goToProfile.path);
            }
        }
    }, [state, isPending, handleDialogClose]);

    return (
        <form id="deleteICalForm" action={action}>
            <p className={"py-3 pl-1"}>
                To remove the property, enter in the following:
            </p>
            <pre className={"p-2"}>
                {user!.profile!.fullName.split(" ")[1]} - {lastSegmentOfId}
            </pre>
            {
                !!user &&
                !!propertyId &&
                <GenericTextInput
                    setAsInputTextField={true}
                    label={"Delete Confirmation Code"}
                    showAsRequired={true}
                    placeholder={`${user!.profile!.fullName.split(" ")[1]} - ${lastSegmentOfId}`}
                    name={"userEnteredDeleteConfirmationCode"}
                    id={"userEnteredDeleteConfirmationCode"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput uploadFit"}
                />
            }
            <div className={"hidden"}>
                <GenericTextInput
                    setAsHiddenField={true}
                    label={"Generated Delete Confirmation Code"}
                    showAsRequired={true}
                    readOnly={true}
                    value={`${user!.profile!.fullName.split(" ")[1]} - ${lastSegmentOfId}`}
                    name={"generatedDeleteConfirmationCode"}
                    id={"generatedDeleteConfirmationCode"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput uploadFit"}
                />
            </div>
            <div className={"hidden"}>
                <GenericTextInput
                    setAsHiddenField={true}
                    label={"Property ID"}
                    showAsRequired={true}
                    readOnly={true}
                    value={`${propertyId}`}
                    name={"property.id"}
                    id={"property.id"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput uploadFit"}
                />
            </div>
            {
                !!state.errors && FormErrorMessage({ formState: state })
            }
            <div className={"flex justify-center"}>
                <FormButton
                    btnType={"submit"}
                    classNames={"button-87"}
                    btnLabel={"Remove Property"}
                    pendingMessage={"Cascading Purge of Property Data..."}
                    useFormStatus={useFormStatus}
                />
            </div>
        </form>
    )
}