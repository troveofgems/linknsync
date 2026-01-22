import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";

export const SyncServiceListColumnDefs: ColumnDef<unknown, any>[] = ([
    {
        accessorKey: "id",
        header: () => {
            return (
                <h2>Processing Id</h2>
            )
        },
        cell: ({ row }) => {
            if (row.original instanceof Object) {
                const data = row.original as unknown as { id: string; };
                return (
                    <div className="capitalize">{data.id}</div>
                );
            }
        },
    },
    {
        accessorKey: "jobBeganAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Run Began At
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if (row.original instanceof Object) {
                const
                    data = row.original as unknown as { jobBeganAt: Date },
                    finalLabel = datetimeConversionTo_String({ timestamp: data.jobBeganAt });

                return (
                    <div className="capitalize">{finalLabel}</div>
                )
            }
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if (row.original instanceof Object) {
                const
                    data: { status: string; } = row.original as unknown as { status: string; },
                    appliedClassnames =
                        "capitalize " + (
                            data.status === "PROCESSED" ? "text-green-500" :
                                data.status === "NOT_PROCESSED" ? "text-gray-500" :
                                    data.status === "PROCESSING" ? "text-gray-500" :
                                        data.status === "FAILED_PROCESSING" ? "text-red-500" :
                                            "text-gray-500"
                        ),
                    label =
                        data.status === "PROCESSED" ? "Processed" :
                            data.status === "NOT_PROCESSED" ? "Not Yet Processed" :
                                data.status === "PROCESSING" ? "Processing" :
                                    data.status === "FAILED_PROCESSING" ? "Failed" :
                                        "No Data";

                return (
                    <div className={appliedClassnames}>{label}</div>
                )
            }
        },
    },
    {
        accessorKey: "jobEndedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Completed On
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if (row.original instanceof Object) {
                const
                    data = row.original as unknown as { jobEndedAt: Date },
                    finalLabel = datetimeConversionTo_String({ timestamp: data.jobEndedAt });

                return (
                    <div className="text-left">{finalLabel}</div>
                );
            }
        },
    },
    {
        accessorKey: "pcs",
        header: () => {
            return (
                <h2>Notes</h2>
            )
        },
        cell: ({ row }) => {
            if (row.original instanceof Object) {
                const
                    data = row.original as unknown as { pcs: string[]; },
                    finalLabel = `${JSON.stringify(data.pcs.join("\n")).replaceAll("\"", "")}`;

                return (
                    <div className="">{finalLabel}</div>
                );
            }
        },
    },
    {
        accessorKey: "errors",
        header: () => {
            return (
                <h2>Errors</h2>
            )
        },
        cell: ({ row }) => {
            if (row.original instanceof Object) {
                const
                    data = row.original as unknown as { errors: string[]; },
                    finalLabel = `${data.errors.length === 0 ? "No Errors" : []}`;

                return (
                    <div className="capitalize text-gray-500">{finalLabel}</div>
                );
            }
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
                    Audit Recorded On
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { createdAt: Date },
                    finalLabel = datetimeConversionTo_String({ timestamp: data.createdAt });

                return (
                    <div className="capitalize text-right">{finalLabel}</div>
                );
            }
        },
    }
]);