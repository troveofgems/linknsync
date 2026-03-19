"use client";
import {useEffect, useState} from "react";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {ConflictResolutionListColumnDefs} from "@/components/tables/columnDefs/logs/conflict.resolution.list.column.defs";
import {TableShell} from "@/components/tables/TableShell";
import {fetchConflictResolutionsAuditListAction, ReadConflictResolutionsAuditActionState} from "@/actions/audit/conflictResolutions/read.action";

export const ConflictResolutionsTable = (
    {
        coid,
        orgRole
    }: {
        coid: string;
        orgRole: string;
    }
) => {
    const
        [isLoadingList, setIsLoadingList] = useState(true),
        [conflictResolutionsTableData, setConflictResolutionsTableData] = useState([]);

    useEffect(() => {
        if (
            isLoadingList &&
            !!coid
        ) {
            fetchConflictResolutionsAuditListAction(
                {} as ReadConflictResolutionsAuditActionState,
                {
                    coid
                }
            ).then((result) => {
                if(!!result.response) {
                    setIsLoadingList(false);
                    setConflictResolutionsTableData(result.response as []);
                }
            })
        }
    }, [coid, conflictResolutionsTableData, isLoadingList]);

    return (
        <>
            {
                isLoadingList && (
                    <LoaderSkeleton
                        loadingMessage={"Loading Calendar Conflict Resolution List"}
                        additionalClassNames={""}
                    />
                )
            }
            {
                !isLoadingList && (
                    <TableShell
                        tableNameId={"conflict_resolutions"}
                        listData={conflictResolutionsTableData}
                        columns={ConflictResolutionListColumnDefs}
                        orgRole={orgRole}
                    />
                )
            }
        </>

    )
}