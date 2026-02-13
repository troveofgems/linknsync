'use client';
import React, {useActionState, useState, useEffect} from "react";

// Actions, Constants, Hooks, & Utils
import {deleteICalAction, DeleteICalActionState} from "@/actions/ical/delete.action";
import {ICalDeletion} from "@/components/forms/property/elements/ICalDeletion";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {SessionDataState} from "@/store/userStore";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {useRouter} from "next/navigation";
import {APP_PATHS} from "@/utils/nav.path.utils";
import {CurrentSource, ICalSource} from "@/components/forms/property/elements/CurrentSource";
import {SubscribedIcalList} from "@/components/structural/tooltip/elements/Cron.elements";

export const DeleteICalFromPropertyForm = (
    {
        user,
        icalList,
        icalId,
        handleDialogClose,
    } : {
        user: SessionDataState;
        icalList: SubscribedIcalList[];
        icalId: string;
        handleDialogClose: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
    const
        { list: viewPropertyList } = APP_PATHS.pages.authenticated.user.goToProperty,
        router = useRouter(),
        formFullyLoaded = !!user,
        userLastName = !!user && user!.profile!.fullName.split(" ")[1],
        idSegments = icalId.split("-"),
        lastSegmentOfId = idSegments[idSegments.length - 1],
        [icalSource/*, setIcalSource*/] = useState(icalList.filter((item: { id: string; }) => item.id === icalId)[0]),
        [generatedDeletionCode] = useState(`${userLastName} - ${lastSegmentOfId}`),
        [state, action, isPending] = useActionState(
            deleteICalAction,
            { pState: user } as DeleteICalActionState
        );

    useEffect(() => {
        if(!!state) {
            if(state.message === "The iCal resource has been successfully removed!") {
                handleDialogClose(false);
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                return router.push(viewPropertyList.path as string);
            }
        }
    }, [state, isPending, handleDialogClose, icalSource, router, viewPropertyList]);

    console.log("Ical Source: ", icalSource, icalList, icalId);

    return (
        <form id="deleteICalForm" action={action}>
            {
                formFullyLoaded && (
                    <div>
                        { CurrentSource(icalSource, icalList as SubscribedIcalList[]) }
                    </div>
                )
            }
            <p className={"py-3 pl-1"}>
                To remove the linked source, enter in the following:
            </p>
            <pre className={"p-2"}>
                {generatedDeletionCode}
            </pre>
            {
                !!user &&
                ICalDeletion(state as DeleteICalActionState, icalSource as unknown as ICalSource, user, lastSegmentOfId)
            }
            <div className={"hidden"}>
                <GenericTextInput
                    setAsHiddenField={true}
                    readOnly={true}
                    value={generatedDeletionCode}
                    name={"code.deletion.generated"}
                    id={"code.deletion.generated"}
                />
            </div>
            <div className={"hidden"}>
                <GenericTextInput
                    setAsHiddenField={true}
                    readOnly={true}
                    value={`${icalSource?.id}`}
                    name={"ical.source.id"}
                    id={"ical.source.id"}
                    labelClassnames={"formLabel"}
                    inputFieldClassnames={"formInput uploadFit"}
                />
            </div>
        </form>
    );
};
