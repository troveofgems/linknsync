import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {ICalOwnerType} from "@prisma/client";

export const UserActionsColumnDefs: ColumnDef<unknown, any>[] = ([
    {
        accessorKey: "userImprint.fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="capitalize">{data.UserImprint.fullName}</div>
            );
        },
    },
    {
        accessorKey: "UserImprint.appRole",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="capitalize text-left">{data.UserImprint.appRole}</div>
            )
        },
    },
    {
        accessorKey: "actionsTaken",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Actions Taken
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const renderActionsTakenFormatted = (
                userAction: {
                    id: string
                    fullName: string
                    userType: ICalOwnerType
                    actionsTaken: string[]
                    api: string
                    path: string
                    uec: string
                    createdAt: Date | string | null | undefined
                }
            ) => {
                if(userAction.api === "create.action" && userAction.path === "property") {
                    return [
                        <p key={`${userAction.id}_createPropertyAPI`}>
                            {userAction.actionsTaken[0]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createPropertyAPI_propertyName`}>
                            {userAction.actionsTaken[1]}
                        </p>,
                        <p key={`${userAction.id}_createPropertyAPI_icalAttached`}>
                            {userAction.actionsTaken[5]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createPropertyAPI_icalAttached_eventsRecorded`}>
                            {userAction.actionsTaken[7]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createPropertyAPI_icalAttached_conflictsRecorded`}>
                            {userAction.actionsTaken[8]}
                        </p>
                    ];
                }
                if(userAction.api === "create.action" && userAction.path === "ical") {
                    return [
                        <p key={`${userAction.id}_createICalAPI`}>
                            {userAction.actionsTaken[0]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createICalAPI_icalAttached_eventsRecorded`}>
                            {userAction.actionsTaken[1]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createICalAPI_icalAttached_conflictsRecorded`}>
                            {userAction.actionsTaken[2]}
                        </p>
                    ];
                }
                if(userAction.api === "update.action" && userAction.path === "ical") {
                    return [
                        <p key={`${userAction.id}_createICalAPI`}>
                            {userAction.actionsTaken[0]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createICalAPI_icalAttached_conflictsRecorded`}>
                            {userAction.actionsTaken[2]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createICalAPI_icalAttached_conflictsRecorded1`}>
                            {userAction.actionsTaken[3]}
                        </p>,
                        <p key={`${userAction.id}_createICalAPI_icalAttached_eventsRecorded`}>
                            {userAction.actionsTaken[1]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createICalAPI_icalAttached_conflictsRecorded2`}>
                            {userAction.actionsTaken[4]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_createICalAPI_icalAttached_conflictsRecorded3`}>
                            {userAction.actionsTaken[5]}
                        </p>
                    ];
                }
                if(userAction.api === "delete.action" && userAction.path === "ical") {
                    return [
                        <p key={`${userAction.id}_deleteICalAPI`}>
                            {userAction.actionsTaken[0]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_deleteICalAPI_icalAttached_eventsRecorded`}>
                            {userAction.actionsTaken[1]}
                        </p>,
                        <p className={"ml-5 text-muted-foreground"} key={`${userAction.id}_deleteICalAPI_icalAttached_conflictsRecorded`}>
                            {userAction.actionsTaken[2]}
                        </p>
                    ];
                }
                if(userAction.api === "send.action" && userAction.path === "email") {
                    return [
                        <div key={`${userAction.id}_sendBookingRequest`}>
                            <p>
                                {userAction.actionsTaken[0].split(":")[0]}
                            </p>
                            <small className={"text-muted-foreground"}>ReqID: {userAction.actionsTaken[0].split(":")[1]}</small>
                        </div>
                    ];
                }
                return (<></>);
            };

            const
                data = row.original,
                compiledJSX = renderActionsTakenFormatted(data);

            return (
                <div className="capitalize">
                    {compiledJSX}
                </div>
            )
        },
    },
    {
        accessorKey: "api",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    API Action
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original,
                finalLabel = data.api.split(".")[0];

            return (
                <div className="text-right">{finalLabel}</div>
            )
        },
    },
    {
        accessorKey: "path",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Resource
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div className="text-right">{data.path}</div>
            )
        },
    },
    {
        accessorKey: "uec",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Action Signature
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original,
                uecIsNull = data.uec === null,
                finalLabel = uecIsNull ? "-" : uec;

            return (
                <div className="capitalize text-right">{finalLabel}</div>
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
                data = row.original,
                finalConversion = datetimeConversionTo_String({ timestamp: data.createdAt });
            return (
                <div className="capitalize text-right">{finalConversion}</div>
            )
        },
    }
]);