import {useEffect, useState} from "react";
import {ICalOwnerType} from "@prisma/client";

import {fetchUserAuditListAction, ReadUserAuditActionState} from "@/actions/audit/user/read.action";
import {TableShell} from "@/components/tables/TableShell";
import {UserActionsColumnDefs} from "@/components/tables/columnDefs/logs/user.actions.column.defs";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";

type UserActionList = {
    id: string;
    fullName: string;
    userType: ICalOwnerType;
    actionsTaken: string[];
    api: string;
    path: string;
    uec: string;
    createdAt: Date | string | null | undefined;
}[]

export const UserAuditTable = (
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
        [userActionsTableData, setUserActionsTableData] = useState<UserActionList>([]);

    useEffect(() => {
        if (
            isLoading &&
            !!coid
        ) {
            fetchUserAuditListAction(
                {} as ReadUserAuditActionState,
                {
                    coid
                }
            ).then((response) => {
                if(!!response.response) {
                    setUserActionsTableData(response.response as unknown as UserActionList);
                    setIsLoading(false);
                }
            })
        }
    }, [coid, userActionsTableData, isLoading]);

    return (
        <div id="userAuditTable" className={"w-full"}>
            {
                isLoading && (
                    <LoaderSkeleton
                        loadingMessage={"Loading Audited User Actions..."}
                        additionalClassNames={""}
                    />
                )
            }
            {
                !isLoading && (
                    <TableShell
                        tableNameId={"userActions_auditTable"}
                        listData={userActionsTableData}
                        columns={UserActionsColumnDefs}
                        orgRole={orgRole}
                    />
                )
            }
        </div>
    )
};