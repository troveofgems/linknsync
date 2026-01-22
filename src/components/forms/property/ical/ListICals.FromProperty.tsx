"use client";
import React, {useEffect, useState} from "react";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {ReadICalActionState, readICalSourceListAction, ReadICalSourcesProps} from "@/actions/calendar/read.action";
import {SessionDataState} from "@/store/userStore";
import {TableShell} from "@/components/tables/TableShell";
import {IcalListColumnDefs} from "@/components/tables/columnDefs/ical.list.column.defs";
import {icalLimiter, LIMIT_REACHED_MESSAGE} from "@/lib/icalLimiter/ical.limiter";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {ICalUploader} from "@/components/forms/property/elements/ICalUploader";
import {CreateICalAttachmentActionState} from "@/actions/ical/create.action";
import {DialogShell} from "@/components/dialogs/DialogShell";
import {ICalSource} from "@/components/forms/property/elements/CurrentSource";

export const ListICalsFromProperty = (
    {
        pid,
        user,
        page = "Default",
        formState,
        useFormStatus,
    }:
    {
        pid: string;
        user: SessionDataState;
        page?: string;
        formState?: {
            pState: SessionDataState;
        };
        useFormStatus?: () => void;
    }
) => {
    const
        [loadingSources, setLoadingSources] = useState(true),
        [loadedICalSources, setLoadedICalSources] = useState(false),
        [sources, setSources] = useState<Partial<ICalSource>[] | null>(null),
        [limitReached, setLimitReached] = useState(true);

    console.log("useFormStatus? ", useFormStatus);

    const
        [icalId, setICalId] = useState<string>(""),
        [openEditICalDialog, setOpenEditICalDialog] = useState(false),
        [openDeleteICalDialog, setOpenDeleteICalDialog] = useState(false),
        [openChangeICalDialog, setOpenChangeICalDialog] = useState(false);

    const
        [alaRestricted, setALARestricted] = useState(false);

    useEffect(() => {
        if(
            sources === null &&
            !loadedICalSources &&
            !!pid
        ) {
            readICalSourceListAction(
                { pState: user } as ReadICalActionState,
                {
                    user,
                    propertyId: pid
                } as ReadICalSourcesProps
            )
                .then(result => {
                    if(result?.response) {
                        const extractedSources = result?.response.icalSources ?? [];
                        setSources(extractedSources);
                        setLoadedICalSources(true);
                        setLoadingSources(false);
                        setLimitReached(icalLimiter({ currentSourceCount: (result?.response?.icalSources?.length as number) }));
                        if(user.loggedInUser?.orgRole === "ALA") {
                            const restrictALAFromUploading =
                                result?.response?.icalSources?.filter((dO) => dO.userImprintId === user.loggedInUser?.userId);
                            setALARestricted((!!restrictALAFromUploading && restrictALAFromUploading?.length > 0) || false);
                        }
                    }
                })
                .catch(e => console.error(e));
        }
    }, [loadedICalSources, pid, sources, user, limitReached]);

    return (
        <>
            {
                loadingSources && (
                    <LoaderSkeleton loadingMessage={"Loading ICal Sources..."} additionalClassNames={"ml-15"} />
                )
            }
            {
                !loadingSources &&
                !!sources && (
                    <>
                        <TableShell
                            tableNameId={"ical_list_for_property"}
                            listData={sources || []}
                            columns={IcalListColumnDefs(
                                user,
                                {
                                    setICalId,
                                    setOpenEditICalDialog,
                                    setOpenDeleteICalDialog,
                                    setOpenChangeICalDialog,
                                },
                                page
                            )}
                            orgRole={user?.loggedInUser?.orgRole as string}
                        />
                        {/* Dialog Layers */}
                        <DialogShell
                            user={user}
                            options={{
                                implementEditICalDialog: true,
                                openEditICalDialog,
                                setOpenEditICalDialog,
                                implementDeleteICalDialog: true,
                                openDeleteICalDialog,
                                setOpenDeleteICalDialog,
                                implementChangeMainICalPropertyDialog: true,
                                openChangeICalDialog,
                                setOpenChangeICalDialog,
                                icalList: sources,
                                icalId,
                            }}
                        />
                        {
                            (
                                formState !== null &&
                                limitReached &&
                                page === "manage"
                            ) ? (
                                <div className={"text-center text-red-500"}>
                                    <p>{LIMIT_REACHED_MESSAGE}</p>
                                </div>
                            ) : (
                                formState !== null &&
                                !limitReached &&
                                page === "manage"
                            ) ? (
                                <>
                                    {
                                        (
                                            user.loggedInUser?.orgRole === "PLA"
                                        ) && (
                                            <>
                                                <div className={"mt-8"}></div>
                                                <ICalUploader
                                                    formState={formState as CreateICalAttachmentActionState}
                                                    containerClassnames={"flex-row"}
                                                    labelClassnames={"w-full"}
                                                    inputFieldClassnames={"w-full"}
                                                />

                                                <div className={"flex mt-5 justify-center"}>
                                                    <FormButton
                                                        btnType={"submit"}
                                                        classNames={"button-87"}
                                                        btnLabel={"Link Your ICal to Property"}
                                                        pendingMessage={"Linking To Property..."}
                                                        useFormStatus={useFormStatus as () => void}
                                                    />
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        (
                                            user.loggedInUser?.orgRole === "ALA" &&
                                            !alaRestricted
                                        ) ? (
                                            <>
                                                <div className={"mt-8"}></div>
                                                <ICalUploader
                                                    formState={formState as CreateICalAttachmentActionState}
                                                    containerClassnames={"flex-row"}
                                                    labelClassnames={"w-full"}
                                                    inputFieldClassnames={"w-full"}
                                                />

                                                <div className={"flex mt-5 justify-center"}>
                                                    <FormButton
                                                        btnType={"submit"}
                                                        classNames={"button-87"}
                                                        btnLabel={"Link Your ICal to Property"}
                                                        pendingMessage={"Linking To Property..."}
                                                        useFormStatus={useFormStatus as () => void}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </>
                )
            }
        </>
    )
}