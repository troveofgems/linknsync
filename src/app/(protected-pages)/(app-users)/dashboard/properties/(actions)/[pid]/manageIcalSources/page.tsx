'use client';
import React from "react";
import {AttachICalToPropertyForm} from "@/components/forms/property/ical/AttachICal.ToProperty.Form";
import {SessionDataState, useUserStore} from "@/store/userStore";

function AttachICalPage() {
    const { user: { isLoading, isAuthenticated, attrs } } = useUserStore();

    return (
        <section>
            <h1 className={"text-2xl font-semibold mb-8 capitalize"}>Manage Linked Sources</h1>
            <div className={"border p-8 rounded-md"}>
                {
                    !isLoading &&
                    isAuthenticated && (
                        <AttachICalToPropertyForm user={attrs as SessionDataState} />
                    )
                }
            </div>
        </section>
    )
}

export default AttachICalPage;
