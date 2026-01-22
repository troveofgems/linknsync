import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import Link from "next/link";

import {APP_PATHS} from "@/constants/nav.path.constants";

export const ConflictListColumnDefs: ColumnDef<unknown, any>[] = ([
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
            const data = row.original;
            console.log("Convert to Linkable: ", data);

            return (
                <div className="capitalize">
                    <Link
                        className={"text-blue-400"}
                        href={APP_PATHS.authenticatedPages.appUser.goToProperty.viewPropertyById.path(data.propertyId)}
                    >
                        {data.propertyName}
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "firstBlock.UserImprint.fullName",
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
            const data = row.original;
            return (
                <div className="capitalize">{data.firstBlock.UserImprint.fullName}</div>
            )
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
            const data = row.original;
            return (
                <div className="capitalize">{data.UserImprint.fullName}</div>
            )
        },
    },
    {
        accessorKey: "existingBookingDates",
        header: (/*{ column }*/) => {
            return (
                /*<Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Existing Booking Dates
                    <ArrowUpDown/>
                </Button>*/
                <h2>Existing Booking Dates</h2>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original,
                convertedStartTime = datetimeConversionTo_String({
                    timestamp: data.firstBlock.startDate as number
                }),
                convertedEndTime = datetimeConversionTo_String({
                    timestamp: data.firstBlock.endDate as number
                }),
                formattedStartTime = convertedStartTime.split(",")[0],
                formattedEndTime = convertedEndTime.split(",")[0];

            return (
                <div className="text-right text-green-500">{formattedStartTime} to {formattedEndTime}</div>
            )
        },
    },
    {
        accessorKey: "conflictBookingDates",
        header: ({ column }) => {
            return (
                <h2>Conflict Booking Dates</h2>
                /*<Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Conflict Booking Dates
                    <ArrowUpDown/>
                </Button>*/
            )
        },
        cell: ({ row }) => {
            const
                data = row.original,
                convertedStartTime = datetimeConversionTo_String({ timestamp: data.startDate }),
                convertedEndTime = datetimeConversionTo_String({ timestamp: data.endDate }),
                formattedStartTime = convertedStartTime.split(",")[0],
                formattedEndTime = convertedEndTime.split(",")[0];

            return (
                <div className="text-right text-red-500">{formattedStartTime} to {formattedEndTime}</div>
            )
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Booking Priority
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original,
                priorityFallsTo = data.firstBlock.priority === "PRIORITY_0" ? "PLA" :
                    data.firstBlock.priority === "PRIORITY_1" ? "ALA" : "NO PRIORITY"

            return (
                <div className="capitalize text-center">{priorityFallsTo}</div>
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
                    Conflict Detected On
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const conflictDetectedOn = row.original;
            return (
                <div className="capitalize text-right">
                    {datetimeConversionTo_String({ timestamp: conflictDetectedOn.createdAt })}
                </div>
            )
        },
    }
]);