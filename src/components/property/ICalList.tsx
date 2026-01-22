import React from "react";
import {SessionDataState} from "@/store/userStore";
import {ListICalsFromProperty} from "@/components/forms/property/ical/ListICals.FromProperty";

export const ICalList = (
    {
        pid,
        user,
        page
    }: {
        pid: string;
        user: SessionDataState;
        page?: string
    }
) => <ListICalsFromProperty pid={pid} user={user} page={page} />;