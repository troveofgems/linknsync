"use client";
import React, {useEffect, useState} from "react";
import {SessionDataState, useUserStore} from "@/store/userStore";
import {useParams} from "next/navigation";
import {AppRole, getUserRole} from "@/lib/utils/AppUser/app.user.utils";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {ReadPropertyComponent} from "@/components/pages/property/ReadProperty.component";

function ReadPropertyPage() {
    const
        urlParams = useParams(),
        [pid, setPID] = useState(""),
        [, setUserRole] = useState<AppRole>(AppRole.IND),
        { user: { isLoading, isAuthenticated, attrs, error } } = useUserStore();

    useEffect(() => {
        if(!!urlParams.pid) {
            setPID(urlParams.pid as string);
        }
        if(!isLoading && !!attrs!.loggedInUser!.orgRole) {
            setUserRole(getUserRole({
                isAdmin: attrs!.loggedInUser!.isAdmin as boolean,
                orgRole: attrs!.loggedInUser!.orgRole as AppRole
            }) as AppRole);
        }
    }, [urlParams, isLoading, attrs]);

    return (
        <div className={"grid grid-cols-2"}>
            {
                isLoading && (
                    <LoaderSkeleton loadingMessage={"Loading User Data..."} additionalClassNames={""} />
                )
            }
            {
                !isLoading &&
                isAuthenticated && (
                    <ReadPropertyComponent
                        pid={pid}
                        user={attrs as SessionDataState}
                    />
                )
            }
            {
                !!error && (
                    <div>Error Loading Section {JSON.stringify(error)}</div>
                )
            }
        </div>
    )
}

export default ReadPropertyPage;