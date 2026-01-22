"use client";
import {useEffect, useState} from "react";
import {SyncServiceListColumnDefs} from "@/components/tables/columnDefs/sync.service.column.defs";
import {TableShell} from "@/components/tables/TableShell";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {fetchSyncAuditListAction, ReadSyncAuditActionState} from "@/actions/audit/sync/read.action";
import {ScheduledJobsAudit} from "@prisma/client";

export const SyncServiceTable = (
    {
        coid,
        orgRole
    }: {
        coid: string;
        orgRole: string;
    }
) => {
    const
        [isLoading, setIsLoading] = useState(true),
        [syncServiceTableData, setSyncServiceTableData] = useState<ScheduledJobsAudit[]>([]);

    useEffect(() => {
        if(isLoading) {
            // Make Call To Audit Table for Sync Service Logs...
            fetchSyncAuditListAction(
                {} as ReadSyncAuditActionState,
                {
                    coid
                }
            )
                .then((result) => {
                    setSyncServiceTableData(result.response as ScheduledJobsAudit[]);
                    setIsLoading(false);
                }).catch(err => console.log(err));
        }
    }, [isLoading, coid]);

    return (
        <>
            {
                isLoading && (
                    <LoaderSkeleton
                        loadingMessage={"Loading Sync Service Logs..."}
                        additionalClassNames={""}
                    />
                )
            }
            {
                !isLoading && (
                    <TableShell
                        tableNameId={"syncService_auditTable"}
                        listData={syncServiceTableData}
                        columns={SyncServiceListColumnDefs}
                        orgRole={orgRole}
                    />
                )
            }
        </>
    );
}