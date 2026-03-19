import {AccessorColumnDef, DisplayColumnDef, GroupColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {ICalOwnerType, PmsUpdateLog} from "@prisma/client";

type UserActionAudit = {
    id: string;
    fullName: string;
    userType: ICalOwnerType;
    actionsTaken: string[];
    api: string;
    path: string;
    uec: string;
    createdAt: string | Date | null | undefined;
}

export const PMSActionsColumnDefs:  DisplayColumnDef<unknown> | GroupColumnDef<unknown> | AccessorColumnDef<unknown> [] = ([
    {
        accessorKey: "pms",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PMS
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original as Partial<PmsUpdateLog>;
            return (
                <div className="capitalize">
                    {data.pms}
                </div>
            );
        },
    },
    {
        accessorKey: "pmsCallActionType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PMS Call Type
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original as Partial<PmsUpdateLog>;
            return (
                <div className="capitalize text-left">
                    {data.pmsCallActionType}
                </div>
            )
        },
    },
    {
        accessorKey: "lnsDateBlockId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    LNS DBID
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const _extractLastPartLNSId = (str: string) => {
                const parts = str.split("-").filter(Boolean);
                return parts[parts.length - 1];
            }

            const
                data = row.original as Partial<PmsUpdateLog>,
                lastIdPart = _extractLastPartLNSId(data.lnsDateBlockId as string);

            return (
                <div className="capitalize text-left">
                    {lastIdPart}
                </div>
            )
        },
    },
    {
        accessorKey: "pmsBlockId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PMS Block ID
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const _extractId = (str: string) => {
                const parts = str.split("/").filter(Boolean);
                return parts[parts.length - 1];
            }

            const
                data = row.original as Partial<PmsUpdateLog>,
                extractableIdExists = !!data.pmsBlockId && data.pmsBlockId.includes("https://"),
                extractId = extractableIdExists ? _extractId(data.pmsBlockId as string) :
                    (!!data.pmsBlockId && data?.pmsBlockId?.length > 0) ? data.pmsBlockId : "-";

            return (
                <div className="capitalize text-left">
                    {extractId}
                </div>
            )
        },
    },
    {
        accessorKey: "pmsResponse",
        header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        PMS Response
                        <ArrowUpDown/>
                    </Button>
                )
            },
        cell: ({row}) => {
            const data = row.original as Partial<PmsUpdateLog>;
            return (
                <div className={`text-left`}>
                    <p className={`${(data.callStatusCode === "201" || data.callStatusCode === "204") ? 'text-green-500' : 'text-red-500'}`}>
                        {data.callStatusCode} - {data.callStatusText}
                    </p>
                </div>
            )
        }
    },
    {
        accessorKey: "requestToPMSSubmittedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Call Sent At
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original as Partial<PmsUpdateLog>;

            return (
                <div className="text-left">{data.requestToPMSSubmittedAt}</div>
            )
        },
    },
    {
        accessorKey: "lnsCallType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    LNS Call Type
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original as Partial<PmsUpdateLog>;
            return (
                <div className="capitalize text-left">
                    {data.lnsCallType}
                </div>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Recorded On
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original as unknown as Partial<UserActionAudit>,
                finalConversion = datetimeConversionTo_String({ timestamp: data.createdAt as string });
            return (
                <div className="capitalize text-right">{finalConversion}</div>
            )
        },
    }
]);