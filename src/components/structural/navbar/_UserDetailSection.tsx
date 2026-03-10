/**
 * FILE DEPRECATED
 * */

import React from "react";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {auth} from "@clerk/nextjs/server";

export const UserDetailSection = async () => {
    const authObj = await auth();
    return (
        <>
            <DropdownMenuSeparator />
            <div className={"text-center text-muted-foreground"}>
                {
                    !!authObj.orgId ? (
                        <div><small></small></div>
                        ) : (
                        <div><small>No Org Created</small></div>
                    )
                }
            </div>
        </>
    );
};
