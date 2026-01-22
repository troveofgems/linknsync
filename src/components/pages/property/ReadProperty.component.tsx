"use client";
import React from "react";

// Components
import {Calendar1} from "@/components/calendar/Calendar.1";

// Actions, Hooks, Utils
import {PropertyView} from "@/components/property/View";
import {ICalList} from "@/components/property/ICalList";
import {SessionDataState} from "@/store/userStore";

export const ReadPropertyComponent = (
    {
        pid,
        user
    }: {
        pid: string;
        user: SessionDataState;
    }
) => (
    <>
        <div className={"flex"}>
            <div className={"w-full"}>
                <Calendar1 pid={pid} user={user} />
            </div>
        </div>
        <div className={"flex flex-col"}>
            <div className={"w-full"}>
                <PropertyView pid={pid} user={user} />
            </div>
            {
                (
                    user.loggedInUser?.orgRole === "PLA" ||
                    user.loggedInUser?.orgRole === "ALA" ||
                    user.loggedInUser?.orgRole === "IND"
                ) &&
                (
                    <div className={"w-full"}>
                        <ICalList pid={pid} user={user} page={"readProperty"} />
                    </div>
                )
            }
        </div>
    </>
)
