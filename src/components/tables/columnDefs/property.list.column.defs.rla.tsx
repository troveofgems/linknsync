"use client";
import React from "react";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, LinkIcon, View, MoreHorizontal, Settings, Trash2, FileSymlink} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Utils
import {HOLISTIC_ICAL_COMPOSITION, SubscribedIcalList} from "@/components/structural/tooltip/elements/Cron.elements";
import {SessionDataState} from "@/store/userStore";
import {Address} from "@prisma/client";
import {Calendar} from "@prisma/client";
import {ColumnDef} from "@tanstack/react-table";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {formatAddress} from "@/lib/utils/Address/address.utils";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import {APP_PATHS} from "@/constants/nav.path.constants";

type PropertyRowData = {
    id: string;
    name: string;
    homePageLink: string;
    thumbnail: string;
    coid: string;
    cid: string;
    createdAt: Date;
    updatedAt: Date;
    Address: Address;
    Calendar: Calendar;
}

// Column Def List
export const propertyListColumnDefsRLA = (
    user: SessionDataState,
    controls: {
        setICalId:  React.Dispatch<React.SetStateAction<string>>;
        setICalList:  React.Dispatch<React.SetStateAction<SubscribedIcalList[]>>;
        setPropertyId:  React.Dispatch<React.SetStateAction<string>>;
    } | object
): ColumnDef<unknown, any>[] => ([
    thumbnailColumnDef(),
    propertyNameColumnDef(),
    locationStateColumnDef(),
    locationPostalCodeColumnDef(),
    locationCountryColumnDef(),
    multiUnitColumnDef(),
    actionsColumnDef()
]);

// Individual Column Defs
const thumbnailColumnDef = () => {
    return {
        accessorKey: "thumbnail",
        header: () => (<div></div>),
        cell: ({ row }) => {
            const data: PropertyRowData = row.original;
            return (
                <PictureWrapper
                    photo={data.Photo}
                />
            );
        }
    }
};

const propertyNameColumnDef = () => {
    return  {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }: { row }) => {
            const data: PropertyRowData = row.original;
            return (
                <div className="capitalize">
                    {data.name}
                </div>
            );
        }
    }
};

const locationStateColumnDef = () => {
    return {
        accessorKey: "Address.state",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    State
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data: PropertyRowData = row.original,
                { Address: propertyAddress } = data;

            return (
                <p>
                    {propertyAddress.state}
                </p>
            )
        },
    };
};

const locationPostalCodeColumnDef = () => {
    return {
        accessorKey: "Address.postalCode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Postal Code
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data: PropertyRowData = row.original,
                { Address: propertyAddress } = data;

            return (
                <p>
                    {propertyAddress.postalCode}
                </p>
            )
        },
    };
};

const locationCountryColumnDef = () => {
    return {
        accessorKey: "Address.country",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Country
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data: PropertyRowData = row.original,
                { Address: propertyAddress } = data;

            return (
                <p>
                    {propertyAddress.country}
                </p>
            )
        },
    };
};

const multiUnitColumnDef = () => {
    return {
        accessorKey: "Address.street2",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Multi-Unit
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data: PropertyRowData = row.original,
                { Address: propertyAddress } = data;

            return (
                <p>
                    {propertyAddress.street2?.length > 0 ? "Multi-Unit" : "Single Unit"}
                </p>
            )
        },
    };
};

const actionsColumnDef = () => {
    const { viewPropertyById } = APP_PATHS.authenticatedPages.appUser.goToProperty;

    return  {
        id: "actions",
        enableHiding: false,
        header: () => {
            return (
                <div className={"text-end"}>
                    View Calendar
                </div>
            )
        },
        cell: ({ row }) => {
            const data: PropertyRowData = row.original;

            return (
                <div className={"flex justify-end"}>
                    <Link
                        className={"flex"}
                        href={viewPropertyById.path(data.id)}
                    >
                        <View className={"text-green-500"} />
                    </Link>
                </div>
            )
        },
    };
};
