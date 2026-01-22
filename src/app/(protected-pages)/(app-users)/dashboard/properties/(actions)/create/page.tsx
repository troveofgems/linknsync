'use client';
import React from "react";
import {CreatePropertyForm} from "@/components/forms/property/CreateProperty.Form";
import {SessionDataState, useUserStore} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";

function CreatePropertyPage() {
    const { user: { isLoading, isAuthenticated, attrs, error } } = useUserStore();

    return (
        <section>
            <h1 className={"text-2xl font-semibold mb-8 capitalize"}>Create A Property</h1>
            <div className={"border p-8 rounded-md"}>
                {
                    isLoading &&
                    <LoaderSkeleton loadingMessage={"Loading Form..."} additionalClassNames={""} />
                }
                {
                    !isLoading &&
                    isAuthenticated &&
                    (
                        <CreatePropertyForm user={attrs as SessionDataState} />
                    )
                }
            </div>
        </section>
    )
}

export default CreatePropertyPage;