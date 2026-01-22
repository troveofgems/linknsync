import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {ColumnDef} from "@tanstack/react-table";

export const ConflictResolutionListColumnDefs: ColumnDef<unknown, any>[] = ([
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Property Name
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { propertyName: string; },
                    finalLabel = data.propertyName;

                return (
                    <div className="capitalize">{finalLabel}</div>
                );
            }
        },
    },
    {
        accessorKey: "firstBookedBy",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Booked By
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { firstBookedBy: string; },
                    finalLabel = data.firstBookedBy;

                return (
                    <div className="capitalize">{finalLabel}</div>
                )
            }
        },
    },
    {
        accessorKey: "retainedDates",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Retained Booking Dates
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { retainedBookingStartDate: Date; retainedBookingEndDate: Date; },
                    convertedStartTime = datetimeConversionTo_String({ timestamp: data.retainedBookingStartDate }),
                    convertedEndTime = datetimeConversionTo_String({ timestamp: data.retainedBookingEndDate }),
                    formattedStartTime = convertedStartTime.split(",")[0],
                    formattedEndTime = convertedEndTime.split(",")[0];

                return (
                    <div className="text-left text-green-500">{formattedStartTime} to {formattedEndTime}</div>
                );
            }
        },
    },
    {
        accessorKey: "conflictUploadedBy",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Conflict Uploaded By
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { conflictUploadedBy: string; },
                    finalLabel = data.conflictUploadedBy;

                return (
                    <div className="capitalize text-right">{finalLabel}</div>
                );
            }
        },
    },
    {
        accessorKey: "purgedConflicts",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Purged Conflict Dates
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { removedBookingStartDate: Date; removedBookingEndDate: Date; },
                    convertedStartTime = datetimeConversionTo_String({ timestamp: data.removedBookingStartDate }),
                    convertedEndTime = datetimeConversionTo_String({ timestamp: data.removedBookingEndDate }),
                    formattedStartTime = convertedStartTime.split(",")[0],
                    formattedEndTime = convertedEndTime.split(",")[0];

                return (
                    <div className="text-right text-red-500">{formattedStartTime} to {formattedEndTime}</div>
                );
            }
        },
    },
    {
        accessorKey: "resolution",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Resolution
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { resolutionAction: string; },
                    finalLabel = data.resolutionAction;

                return (
                    <div className="capitalize text-center">{finalLabel}</div>
                );
            }
        },
    },
    {
        accessorKey: "resolvedOn",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Resolution Detected On
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            if(row.original instanceof Object) {
                const
                    data = row.original as unknown as { createdAt: Date; },
                    finalLabel = datetimeConversionTo_String({ timestamp: data.createdAt });

                return (
                    <div className="capitalize text-right">{finalLabel}</div>
                );
            }
        },
    },
]);