import {AccessorColumnDef, DisplayColumnDef, GroupColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import Link from "next/link";

import {APP_PATHS} from "@/utils/nav.path.utils";
import {DateBlock, DateBlockConflict, UserImprint} from "@prisma/client";

export const ConflictListColumnDefs:
    DisplayColumnDef<unknown> | GroupColumnDef<unknown> | AccessorColumnDef<unknown> [] = ([
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
            const data = row.original as { propertyId: string; propertyName: string; };
            console.log("Convert to Linkable: ", data);

            return (
                <div className="capitalize">
                    <Link
                        className={"text-blue-400"}
                        href={
                            typeof APP_PATHS.pages.authenticated.user.goToProperty.view.path === "function" ?
                                APP_PATHS.pages.authenticated.user.goToProperty.view.path(data.propertyId) :
                                "/"
                        }
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
            const data = row.original as unknown as { firstBlock: { UserImprint: Partial<UserImprint>; } };
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
            const data = row.original as unknown as { UserImprint: Partial<UserImprint>; };
            return (
                <div className="capitalize">{data.UserImprint.fullName}</div>
            )
        },
    },
    {
        accessorKey: "existingBookingDates",
        header: () => {
            return (
                <h2>Existing Booking Dates</h2>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original as unknown as { firstBlock: Partial<DateBlock>; },
                convertedStartTime = datetimeConversionTo_String({
                    timestamp: data.firstBlock.startDate as Date
                }),
                convertedEndTime = datetimeConversionTo_String({
                    timestamp: data.firstBlock.endDate as Date
                })/*,
                formattedStartTime = convertedStartTime.split(",")[0],
                formattedEndTime = convertedEndTime.split(",")[0]*/;

            return (
                <div className="text-right">
                    {convertedStartTime} to {convertedEndTime}
                </div>
            )
        },
    },
    {
        accessorKey: "conflictBookingDates",
        header: () => {
            return (
                <h2>Conflicting Booking Dates</h2>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original as unknown as { startDate: string; endDate: string },
                convertedStartTime = datetimeConversionTo_String({ timestamp: data.startDate }),
                convertedEndTime = datetimeConversionTo_String({ timestamp: data.endDate })/*,
                formattedStartTime = convertedStartTime.split(",")[0],
                formattedEndTime = convertedEndTime.split(",")[0]*/;

            return (
                <div className="text-right text-red-500">
                    {convertedStartTime} to {convertedEndTime}
                </div>
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
                data = row.original as unknown as { firstBlock: Partial<DateBlock> },
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
            const conflictDetectedOn = row.original as unknown as Partial<DateBlockConflict>;
            return (
                <div className="capitalize text-right">
                    {datetimeConversionTo_String({ timestamp: conflictDetectedOn.createdAt as Date })}
                </div>
            )
        },
    }
]);