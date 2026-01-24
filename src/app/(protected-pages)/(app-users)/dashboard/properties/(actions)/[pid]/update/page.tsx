"use client";

import {SessionDataState, useUserStore} from "@/store/userStore";
import {UpdatePropertyForm} from "@/components/forms/property/UpdatePropertyForm";
import React from "react";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";

function UpdatePropertyPage() {
    const { user: { isLoading, isAuthenticated, attrs, error } } = useUserStore();

    return (
        <section>
            <h1 className={"text-2xl font-semibold mb-8 capitalize"}>Update Your Property</h1>
            <div className={"border p-8 rounded-md"}>
                {
                    isLoading &&
                    <LoaderSkeleton loadingMessage={"Loading Form..."} additionalClassNames={""} />
                }
                {
                    !isLoading &&
                    isAuthenticated &&
                    (
                        <UpdatePropertyForm user={attrs as SessionDataState} />
                    )
                }
            </div>
            {!!error && (
                <div>Error Loading Section {JSON.stringify(error)}</div>
            )}
        </section>
    )
}

export default UpdatePropertyPage;