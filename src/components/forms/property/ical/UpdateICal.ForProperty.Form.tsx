'use client';
import React, {useActionState, useState, useEffect} from "react";

// Actions, Constants, Hooks, & Utils
import {updateICalAction, UpdateICalActionState} from "@/actions/ical/update.action";
import {ICalUploader} from "@/components/forms/property/elements/ICalUploader";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {useFormStatus} from "react-dom";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {CurrentSource, ICalSource} from "@/components/forms/property/elements/CurrentSource";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {SessionDataState} from "@/store/userStore";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {useRouter} from "next/navigation";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {APP_PATHS} from "@/utils/nav.path.utils";

export const UpdateICalForPropertyForm = (
    {
        user,
        icalList,
        icalId,
        handleDialogClose,
    } : {
        user: SessionDataState;
        icalList: ICalSource[];
        icalId: string;
        handleDialogClose: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
    const checkTimelockStatus = (icalSource: ICalSource) => {
        if(icalSource.createdAt.getTime() === icalSource.updatedAt.getTime()) {
            return {
                actionIsTimelocked: false,
            };
        }

        const
            currentTime = new Date().getTime(),
            nextUpdateAvailableAt = new Date(icalSource.updatedAt.getTime());

        nextUpdateAvailableAt.setHours(24 + icalSource.updatedAt.getHours());

        if(currentTime < nextUpdateAvailableAt.getTime()) {
            return {
                actionIsTimelocked: true,
                lastUpdateMade: icalSource.updatedAt.toLocaleDateString() + " at " + icalSource.updatedAt.toLocaleTimeString(),
                nextManualPushAvailableAt: new Date(nextUpdateAvailableAt).toLocaleDateString() + " at " + nextUpdateAvailableAt.toLocaleTimeString(),
                hours: (nextUpdateAvailableAt.getTime() - icalSource.updatedAt.getTime()) / (60 * 60 * 1000),
            };
        }

        return {
            actionIsTimelocked: false,
        };
    }

    const
        { list: viewPropertyList } = APP_PATHS.pages.authenticated.user.goToProperty,
        router = useRouter(),
        [icalSource] = useState(icalList.filter((item: { id: string; }) => item.id === icalId)[0]),
        [state, action, isPending] = useActionState(
            updateICalAction,
            { pState: user } as UpdateICalActionState
        ),
        [timelockStatus] = useState(checkTimelockStatus(icalSource));

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "The iCal Resource has been successfully updated!") {
                handleDialogClose(false);
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                return router.push(viewPropertyList.path as string);
            }
        }
    }, [state, isPending, handleDialogClose, router, viewPropertyList]);

    return (
        <form
            action={action}
            key={"update-ical-for-property"}
        >
            {
                CurrentSource(icalSource, icalList)
            }
            {
                timelockStatus.actionIsTimelocked ? (
                    <>
                        <div className={"flex justify-center"}>
                            <small className={"my-3 text-red-500"}>
                                You have met your allowed quota of manual pushes for the day.
                            </small>
                        </div>
                        <p>
                            You may re-upload the file in {timelockStatus.hours} Hours.
                        </p>
                        <DropdownMenuSeparator />
                        <div className={"flex justify-between"}>
                            <div>
                                <p>Last Update Made:</p>
                                <p>Next Allowed Update:</p>
                            </div>
                            <div>
                                <p>{timelockStatus.lastUpdateMade}</p>
                                <p>{timelockStatus.nextManualPushAvailableAt}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={"flex flex-row"}>
                            <ICalUploader
                                formState={state}
                                containerClassnames={"flex-col"}
                                labelClassnames={"w-full"}
                                inputFieldClassnames={"w-full"}
                            />
                        </div>
                        <div className={"hidden"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                useSubInputType={true}
                                inputType={"hidden"}
                                label={"ICal Source ID"}
                                showAsRequired={true}
                                readOnly={true}
                                value={`${icalSource?.id}`}
                                name={"ical.id"}
                                id={"ical.id"}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput uploadFit"}
                            />
                            <GenericTextInput
                                setAsInputTextField={true}
                                useSubInputType={true}
                                inputType={"hidden"}
                                label={"Property Id"}
                                id={"ical.property.id"}
                                name={"ical.property.id"}
                                readOnly={true}
                                value={""}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                            />
                            <GenericTextInput
                                setAsInputTextField={true}
                                useSubInputType={true}
                                inputType={"hidden"}
                                label={"Calendar Id"}
                                name={"ical.calendar.id"}
                                id={"ical.calendar.id"}
                                readOnly={true}
                                value={""}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                            />
                            <GenericTextInput
                                setAsInputTextField={true}
                                useSubInputType={true}
                                inputType={"hidden"}
                                label={"Cron Service Id"}
                                id={"ical.cron.id"}
                                name={"ical.cron.id"}
                                readOnly={true}
                                value={""}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                        <div className={"flex mt-5 justify-center"}>
                            <FormButton
                                btnType={"submit"}
                                classNames={"button-87"}
                                btnLabel={"Push ICal Update"}
                                pendingMessage={"Pushing ICal Changes..."}
                                useFormStatus={useFormStatus}
                            />
                        </div>
                        {
                            !!state.errors && FormErrorMessage({ formState: state })
                        }
                    </>
                )
            }
        </form>
    );
};
