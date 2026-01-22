"use client";
import React, {useEffect, useState} from "react";

import {TableShell} from "@/components/tables/TableShell";
import {ConflictListColumnDefs} from "@/components/tables/columnDefs/conflict.list.column.defs";
import {CollisionList} from "@/components/lists/CollisionList";
import {SessionDataState} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";

export const CollisionListTable = (
    {
        user
    } :
    {
        user: SessionDataState
    }) => {
    const
        [conflictList, setConflictList] = useState([]),
        [isLoadingConflictList, setIsLoadingConflictList] = useState(true);

    useEffect(() => {
        if(isLoadingConflictList) {
            CollisionList({ user }).then((res)=> {
                setConflictList(res.response.conflictList.response);
                setIsLoadingConflictList(false);
            });
        }
    }, [user, isLoadingConflictList, conflictList]);

    return (
        <>
            {
                isLoadingConflictList ? (
                    <LoaderSkeleton
                        additionalClassNames={""}
                        loadingMessage={"Loading Calendar Conflict List"} />
                ) : (
                    <TableShell
                        tableNameId={"conflictListTable"}
                        listData={conflictList}
                        columns={ConflictListColumnDefs}
                        orgRole={user.loggedInUser?.orgRole as string}
                    />
                )
            }
        </>
    );
}

export default CollisionListTable;