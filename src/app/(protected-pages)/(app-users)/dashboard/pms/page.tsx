"use client";
import {SessionDataState, useUserStore} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import React from "react";
import {PMSList} from "@/app/(protected-pages)/(app-users)/dashboard/pms/_component/pms-list";

function PMSPage() {
    const { user: { isLoading, attrs } } = useUserStore();

    return (
        <div>
            {isLoading && <LoaderSkeleton loadingMessage={"Loading PMS Profile"} additionalClassNames={""} />}
            {
                !isLoading && (
                    <>
                        <PMSList user={attrs as SessionDataState} />
                    </>
                )
            }
        </div>
    );
}

export default PMSPage;