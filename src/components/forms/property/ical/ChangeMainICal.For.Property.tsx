'use client';
import React, {useActionState, useState, useEffect} from "react";

// Actions, Constants, Hooks, & Utils
import {changeMainSourceICalAction, UpdateICalActionState} from "@/actions/ical/update.action";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {useFormStatus} from "react-dom";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {CurrentSource, ICalSource} from "@/components/forms/property/elements/CurrentSource";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {SessionDataState} from "@/store/userStore";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {useRouter} from "next/navigation";
import {APP_PATHS} from "@/constants/nav.path.constants";

export const ChangeMainICalForPropertyForm = (
    {
        user,
        icalList,
        icalId,
        closeDialogAction,
    } : {
        user: SessionDataState;
        icalList: ICalSource[];
        icalId: string;
        closeDialogAction: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
    const
        { viewPropertyList } = APP_PATHS.authenticatedPages.appUser.goToProperty,
        router = useRouter(),
        [newICalSource] = useState(icalList.filter((item: { id: string; }) => item.id === icalId)[0]),
        [mainSource] = useState(icalList.filter((item: { id: string; isMainSrc: boolean; }) => item.isMainSrc)[0]),
        [state, action, isPending] = useActionState(
            changeMainSourceICalAction,
            { pState: user } as UpdateICalActionState
        );

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "The Main Source has been successfully updated!") {
                closeDialogAction(false);
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                return router.push(viewPropertyList.path);
            }
        }
    }, [state, isPending, closeDialogAction, router, viewPropertyList]);

    return (
        <form
            action={action}
            key={"change-main-ical-source"}
        >
            {
                CurrentSource(newICalSource, icalList, "changeMain")
            }
            <GenericTextInput
                setAsHiddenField={true}
                showAsRequired={false}
                id={`ical.source.current`}
                name={`ical.source.current`}
                key={`ical.source.current`}
                value={mainSource.id}
                readOnly={true}
            />
            <GenericTextInput
                setAsHiddenField={true}
                showAsRequired={false}
                id={`ical.source.new`}
                name={`ical.source.new`}
                key={`ical.source.new`}
                value={newICalSource.id}
                readOnly={true}
            />
            <div className={"flex mt-5 justify-center"}>
                <FormButton
                    btnType={"submit"}
                    classNames={"button-87"}
                    btnLabel={"Change Main Source"}
                    pendingMessage={"Changing the Main Source..."}
                    useFormStatus={useFormStatus}
                />
            </div>
            {
                !!state.errors && FormErrorMessage({ formState: state })
            }
        </form>
    );
};
