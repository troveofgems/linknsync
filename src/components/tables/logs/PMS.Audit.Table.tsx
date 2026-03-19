import {useEffect, useState} from "react";

import {fetchPMSAuditListAction, ReadPMSAuditActionState} from "@/actions/audit/pms/read.action";
import {TableShell} from "@/components/tables/TableShell";
import {PMSActionsColumnDefs} from "@/components/tables/columnDefs/logs/pms.actions.column.defs";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {PmsUpdateLog} from "@prisma/client";

export const PMSAuditTable = (
    {
        coid,
        orgRole,
    }: {
        coid: string;
        orgRole: string;
    }
) => {
    const
        [isLoading, setIsLoading] = useState(true),
        [pmsActionsTableData, setPMSActionsTableData] = useState<Partial<PmsUpdateLog>[]>([]);

    useEffect(() => {
        if (
            isLoading &&
            !!coid
        ) {
            fetchPMSAuditListAction(
                {} as ReadPMSAuditActionState,
                {
                    coid
                }
            ).then((response) => {
                if(!!response.response) {
                    setPMSActionsTableData(response?.response as Partial<PmsUpdateLog>[]);
                    setIsLoading(false);
                }
            })
        }
    }, [coid, pmsActionsTableData, isLoading]);

    return (
        <div id="pmsAuditTable" className={"w-full"}>
            {
                isLoading && (
                    <LoaderSkeleton
                        loadingMessage={"Loading Audited PMS Actions..."}
                        additionalClassNames={""}
                    />
                )
            }
            {
                !isLoading && (
                    <TableShell
                        tableNameId={"userActions_auditTable"}
                        listData={pmsActionsTableData}
                        columns={PMSActionsColumnDefs}
                        orgRole={orgRole}
                    />
                )
            }
        </div>
    )
};