'use client';
import React, {useActionState, useEffect, useState} from "react";

// Actions, Constants, Hooks, & Utils
import {exportLNSICalAction, UpdateICalActionState} from "@/actions/ical/update.action";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {useFormStatus} from "react-dom";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {SessionDataState} from "@/store/userStore";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {useRouter} from "next/navigation";
import {ICalSource} from "@/components/forms/property/elements/CurrentSource";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {addEllipsis} from "@/utils/string.utils";
import {APP_PATHS} from "@/utils/nav.path.utils";

export const ExportLNSICSForPropertyForm = (
    {
        user,
        icalList,
        handleDialogClose,
    } : {
        user: SessionDataState;
        icalList: ICalSource[];
        icalId: string;
        handleDialogClose: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
    const
        { list: viewPropertyList } = APP_PATHS.pages.authenticated.user.goToProperty,
        router = useRouter(),
        [readyForDownload, setReadyForDownload] = useState(false),
        [downloadData, setDownloadData] = useState<UpdateICalActionState | null>(null),
        [state, action, isPending] = useActionState(
            exportLNSICalAction,
            { pState: user } as UpdateICalActionState
        );

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "Data Ready For Streaming..." && downloadData === null) {
                Alert({
                    message: "Data Ready & Downloading...",
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                setDownloadData(state.response as unknown as UpdateICalActionState);
                setReadyForDownload(true);
                const downloadHref = state.response.downloadHref ?? "/";
                return router.push(downloadHref);
            }
        }
    }, [state, isPending, handleDialogClose, router, viewPropertyList, downloadData]);

    return (
        <form
            action={action}
            key={"export-lns-ical-source"}
        >
            <h2 className={"text-end"}>Included Files</h2>
            <DropdownMenuSeparator />
            <div className={"flex flex-col space-between flex-wrap mt-3 justify-start"}>
                {
                    icalList.map((item, index) => (
                        <div key={`div_exportable.option.${index}`}>
                            <GenericTextInput
                                setAsCheckbox={true}
                                showAsRequired={false}
                                id={`exportable.option.${index}`}
                                name={`exportable.option.${index}`}
                                key={`exportable.option.${index}`}
                                defaultChecked={true}
                                handleOnClick={() => {}}
                                containerClassnames={"flex flex-end flex-row justify-end my-2"}
                                labelClassnames={"formCheckboxLabel"}
                                inputFieldClassnames={"formCheckbox"}
                                label={`${addEllipsis(item.icalFilename as string, 15)} exports ${item.dateBlocks.length} events ${item.isMainSrc ? "[Primary]" : "[Secondary]"} `}
                            />
                            <GenericTextInput
                                setAsHiddenField={true}
                                showAsRequired={false}
                                id={`exportable.option.${index}.id`}
                                name={`exportable.option.${index}.id`}
                                key={`exportable.option.${index}.id`}
                                value={item.id}
                                readOnly={true}
                            />
                        </div>
                    ))
                }
            </div>
            <DropdownMenuSeparator className={"mt-3 mb-0"} />
            <div className={"flex mt-5 justify-center"}>
                {
                    (!readyForDownload) && (
                        <FormButton
                            btnType={"submit"}
                            classNames={`button-87`}
                            btnLabel={"Export ICal Source"}
                            pendingMessage={"Building and Exporting ICal Data..."}
                            useFormStatus={useFormStatus}
                        />
                    )
                }
                {
                    readyForDownload && (
                        <a
                            className={`button-87`}
                            href={state.response.downloadHref}
                            download={state.response.filename}
                        >
                            Download ICS
                        </a>
                    )
                }
            </div>
            {
                (state?.errors !== undefined) && <FormErrorMessage formState={state} />
            }
        </form>
    );
};
