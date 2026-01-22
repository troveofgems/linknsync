"use client";
import {useEffect, useState} from "react";
import {fetchCronServiceListAction, ReadCronServiceActionState} from "@/actions/cronService/read.action";
import {TableShell} from "@/components/tables/TableShell";
import {LinkedPropertiesListColumnDefs} from "@/components/tables/columnDefs/linked.properties.list.column.defs";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {$Enums} from "@prisma/client";

type CronServiceLinkedProperties = {
    id: string
    icalFileUploadLimit: $Enums.ICalFileUploadLimit
    scheduleType: $Enums.ScheduleType
    lastRun: Date | null
    nextRun: Date
    status: $Enums.CronServiceStatus
    createdAt: Date
    Property: {
        coid: string
        name: string;
    }[]
}

export const LinkedPropertiesTable = (
    {
        coid,
        orgRole
    }: {
        coid: string;
        orgRole: string;
    }
) => {
    const
        [cronServiceTableData, setCronServiceTableData] = useState<CronServiceLinkedProperties[]>([]),
        [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading && !!coid) {
            fetchCronServiceListAction( // Load Data
                {} as ReadCronServiceActionState,
                {
                    coid
                }
            ).then((result) => {
                setCronServiceTableData(result.response as unknown as CronServiceLinkedProperties[]);
                setIsLoading(false);
            });
        }
    }, [isLoading, cronServiceTableData, coid]);

    return (
        <div id="userAuditTable" className={"w-full"}>
            {
                isLoading && (
                    <LoaderSkeleton
                        loadingMessage={"Loading Linked Properties..."}
                        additionalClassNames={""}
                    />
                )
            }
            {
                !isLoading && (
                    <TableShell
                        tableNameId={"linked_properties"}
                        listData={cronServiceTableData}
                        columns={LinkedPropertiesListColumnDefs}
                        orgRole={orgRole}
                    />
                )
            }
        </div>
    )
};