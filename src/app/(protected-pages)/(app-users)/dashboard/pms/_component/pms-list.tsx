"use client";
import React, {useActionState, useEffect, useState} from "react";

// Session State Type
import {SessionDataState} from "@/store/userStore";

// Actions, Hooks, Utils
import {fetchPMSAction, FetchPMSListActionState} from "@/actions/pms/fetch.action";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {AttachedPMS} from "@prisma/client";
import {ConnectPMSForm} from "@/app/(protected-pages)/(app-users)/dashboard/pms/_component/pms-form";

export const PMSList = (
    {
        user
    } : {
        user: SessionDataState
    }) => {
    const
        [trackAlreadyImplemented, setTrackAlreadyImplemented] = useState(false),
        [pmsList, setPMSList] = useState<Partial<AttachedPMS>[]>([]),
        [loadingPMSList, setLoadingPMSList] = useState<boolean>(true),
        [state, isPending] = useActionState(
            fetchPMSAction,
            {
                pState: user,
            } as FetchPMSListActionState
        );

    const handleTrackAlreadyImplemented = () => setTrackAlreadyImplemented(true);

    useEffect(() => {
        if(
            loadingPMSList &&
            !!user
        ) {
            fetchPMSAction(user)
                .then((result)=> {
                    const { response } = result as Partial<FetchPMSListActionState>;
                    const { pmsList: retrievedPMSList } = response as {
                        pmsList?: AttachedPMS[]
                    };
                    if(!!pmsList) {
                        setPMSList(retrievedPMSList as Partial<AttachedPMS>[]);
                    }
                    const trackSearch = retrievedPMSList?.filter(item => item.pmsName === "Track");
                    console.log("Track already implemented? ", trackSearch);
                    if(!!trackSearch && trackSearch.length > 0) {
                        handleTrackAlreadyImplemented();
                    }
                    setLoadingPMSList(false);
                });
        }
    }, [state, isPending, loadingPMSList, user, pmsList]);

    return (
        <div className={"p-1 mb-5"}>
            <h2 className={"text-1xl font-semibold capitalize"}>Connected PMS List</h2>
            <DropdownMenuSeparator />
            {
                pmsList.length === 0 && (
                    <small>No PMS Connected Yet!</small>
                )
            }
            {
                pmsList.length > 0 &&
                pmsList.map((pms, index) => (
                    <div key={`pms-connection-${index}`} className={"flex flex-row"}>
                        <div className={"w-1/4 py-3"}>
                            <div>
                                <em>PMS Name</em>
                            </div>
                            <div>{pms.pmsName}</div>

                        </div>
                        <div className={"w-1/4 py-3"}>
                            <div>
                                <em>Domain</em>
                            </div>
                            {pms.domain}
                        </div>
                        <div className={"w-1/4 py-3"}>
                            <div>
                                <em>Block Reason Id</em>
                            </div>
                            {pms.blockReasonId}
                        </div>
                    </div>
                ))
            }
            {
                !loadingPMSList &&
                !trackAlreadyImplemented &&
                (
                    <ConnectPMSForm
                        handleRefreshList={handleTrackAlreadyImplemented}
                        user={user}
                    />
                )
            }
        </div>
    );
};