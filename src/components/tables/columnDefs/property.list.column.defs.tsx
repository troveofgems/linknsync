"use client";
import React from "react";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, View, MoreHorizontal, Settings, Trash2, CalendarCog, Cake} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Utils
import {
    ARCHIVED_PROPERTY,
    HOLISTIC_ICAL_COMPOSITION,
    SubscribedIcalList
} from "@/components/structural/tooltip/elements/Cron.elements";
import {SessionDataState} from "@/store/userStore";
import {Address} from "@prisma/client";
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
    Calendar: any;
}

// Column Def List
export const propertyListColumnDefs = (
    user: SessionDataState,
    controls: {
        setICalId:  React.Dispatch<React.SetStateAction<string>>;
        setICalList:  React.Dispatch<React.SetStateAction<SubscribedIcalList[]>>;
        setPropertyId:  React.Dispatch<React.SetStateAction<string>>;
        setOpenEditICalDialog:  React.Dispatch<React.SetStateAction<boolean>>;
        setOpenDeleteICalDialog:  React.Dispatch<React.SetStateAction<boolean>>;
        setOpenDeletePropertyDialog:  React.Dispatch<React.SetStateAction<boolean>>;
        setOpenExportICalDialog:  React.Dispatch<React.SetStateAction<boolean>>;
    } | object,
): ColumnDef<unknown, any>[] => ([
    thumbnailColumnDef(),
    propertyNameColumnDef(),
    locationColumnDef(),
    holisticICalColumnDef(),
    icalCountColumnDef(),
    createdAtColumnDef(),
    lastUpdateColumnDef(),
    individualStateColumnDef(),
    individualPostalCodeColumnDef(),
    individualCountryColumnDef(),
    actionsColumnDef(user, controls)
]);

// Individual Column Defs
const thumbnailColumnDef = () => {
    return {
        accessorKey: "thumbnail",
        header: () => (<div></div>),
        cell: ({ row }) => {
            return (
                <PictureWrapper
                    classNames={"w-full"}
                    photo={!!row.original.Photo ? {
                        thumbnailUrl: row.original.Photo.srcUrl,
                        width: `${row.original.Photo.width}`,
                        height: `${row.original.Photo.height}`,
                        title: row.original.Photo.title
                    } : undefined}
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
        cell: ({ row }) => {
            const data: PropertyRowData = row.original;
            return (
                <div className="capitalize">
                    {data.name}
                </div>
            );
        }
    }
};

const locationColumnDef = () => {
    return {
        accessorKey: "location",
        header: () => {
            return (
                <div>Full Address</div>
            )
        },
        cell: ({ row }) => {
            const
                data: PropertyRowData = row.original,
                { Address: propertyAddress } = data,
                formattedAddress = formatAddress(propertyAddress);

            return (
                <pre className={"mr-5"}>
                    {formattedAddress}
                </pre>
            )
        },
    };
};

const holisticICalColumnDef = () => {
    return {
        accessorKey: "holisticIcalComposition",
        header: () => <div>Holistic ICal Composition</div>,
        cell: ({ row }) => {
            const data: PropertyRowData = row.original;

            const hasBeenArchived = data.archived;

            return (
                <div className={"text-start"}>
                    {!hasBeenArchived && HOLISTIC_ICAL_COMPOSITION(data.Calendar.icalSources)}
                    {hasBeenArchived && (
                        <>
                            {ARCHIVED_PROPERTY()}
                        </>
                    )}
                </div>
            )
        },
    };
};

const icalCountColumnDef = () => {
    return {
        accessorKey: "numAttachedICals",
        header: () => <div># Attached ICals</div>,
        cell: ({ row }) => {
            let showUnlimited = false;
            const
                data = row.original,
                icalCount = data.Calendar.icalSources?.length || 0,
                maxAllowed =
                    data.Calendar.CronService.icalFileUploadLimit === "THREE" ? 3 :
                        data.Calendar.CronService.icalFileUploadLimit === "TEN" ? 10 :
                            data.Calendar.CronService.icalFileUploadLimit === "UNLIMITED" ? (showUnlimited = true) :
                                0;

            return (
                <div className="text-left">
                    {showUnlimited ? (
                        <>
                            {icalCount} <span className={"lowercase"}>of</span> {maxAllowed} <span>max</span>
                        </>
                    ) : (
                        <>
                            {icalCount} of {maxAllowed} Max
                        </>
                    )}
                </div>
            )
        },
    };
};

const individualStateColumnDef = () => {
    return {
        accessorKey: "Address.state",
        header: ({ column }) => {
            return (
                <Button
                    className={"ml-7"}
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
                <p className={"text-left ml-7"}>
                    {propertyAddress.state}
                </p>
            )
        },
    }
};

const individualPostalCodeColumnDef = () => {
    return {
        accessorKey: "Address.postalCode",
        header: ({ column }) => {
            return (
                <Button
                    className={"ml-7"}
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
                <p className={"text-left ml-7"}>
                    {propertyAddress.postalCode}
                </p>
            )
        },
    }
};

const individualCountryColumnDef = () => {
    return {
        accessorKey: "Address.country",
        header: ({ column }) => {
            return (
                <Button
                    className={"ml-7"}
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
                <p className={"text-left ml-7"}>
                    {propertyAddress.country}
                </p>
            )
        },
    }
};

const createdAtColumnDef = () => {
    return {
        accessorKey: "createdAt",
        header: ({ column }: { column: never }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data: PropertyRowData = row.original,
                {createdAt} = data,
                formattedLUATimestamp = datetimeConversionTo_String({ timestamp: createdAt as Date });

            return (
                <div className="text-right">
                    {formattedLUATimestamp}
                </div>
            )
        },
    };
};

const lastUpdateColumnDef = () => {
    return {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Updated At
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const
                data: PropertyRowData = row.original,
                {updatedAt} = data,
                formattedLUATimestamp = datetimeConversionTo_String({ timestamp: updatedAt as Date });

            return (
                <div className="text-right">
                    {formattedLUATimestamp}
                </div>
            )
        },
    };
};

const actionsColumnDef = (
    user: SessionDataState,
    controls: {
        setICalId:  React.Dispatch<React.SetStateAction<string>>;
        setICalList:  React.Dispatch<React.SetStateAction<SubscribedIcalList[]>>;
        setPropertyId:  React.Dispatch<React.SetStateAction<string>>;
        setOpenExportICalDialog: React.Dispatch<React.SetStateAction<boolean>>;
        setOpenEditICalDialog: React.Dispatch<React.SetStateAction<boolean>>;
        setOpenDeleteICalDialog: React.Dispatch<React.SetStateAction<boolean>>;
        setOpenDeletePropertyDialog: React.Dispatch<React.SetStateAction<boolean>>;
    }
) => {
    const { viewPropertyById, updateProperty, manageIcalSourcesForProperty } = APP_PATHS.authenticatedPages.appUser.goToProperty;

    function addEllipsis(str: string, maxLength = 10) {
        if (str.length > maxLength) {
            // Subtract 3 from maxLength to account for the "..."
            return str.substring(0, maxLength - 3) + '...';
        }
        return str;
    }

    return  {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const data: PropertyRowData = row.original;

            const // Property Level
                {createdAt: propertyCreatedAt, updatedAt: propertyUpdatedAt} = data,
                propertyCreatedOn = datetimeConversionTo_String({ timestamp: propertyCreatedAt as Date }),
                propertyNotYetUpdated = propertyCreatedAt.getTime() === propertyUpdatedAt.getTime(),
                propertyUpdatedOn = propertyNotYetUpdated ?
                    "No Updates Yet" :
                    datetimeConversionTo_String({ timestamp: propertyUpdatedAt as Date }),
                propertyCannotExport = row.original.Calendar.icalSources.length <= 1;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <View className={"text-green-500"} />
                            <Button
                                className={"overrideActionBtnStyles"}
                            >
                                <Link
                                    href={viewPropertyById.path(data.id)}
                                >
                                    View Property
                                </Link>
                            </Button>
                        </DropdownMenuItem>
                        {
                            (
                                user.loggedInUser?.orgRole === "PLA" ||
                                user.loggedInUser?.orgRole === "ALA"
                            ) && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <CalendarCog className={"text-orange-500"} />
                                        <Button
                                            className={"overrideActionBtnStyles"}
                                        >
                                            <Link
                                                href={manageIcalSourcesForProperty.path(data.id)}
                                            >
                                                Manage ICal Sources
                                            </Link>
                                        </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className={"flex flex-col w-full lnsExport:disabled"}>
                                            <div className={"flex flex-row w-full items-center"}>
                                                <Cake className={"text-blue-400 mr-2"} />
                                                <Button
                                                    className={`overrideActionBtnStyles ${propertyCannotExport ? "lnsExportDisable" : ""}`}
                                                    onClick={
                                                    propertyCannotExport ? () => {} :
                                                    () => {
                                                        controls.setPropertyId(data.id);
                                                        controls.setICalList(data.Calendar.icalSources);
                                                        controls.setOpenExportICalDialog(true);
                                                    }
                                                }
                                                >
                                                    LNS Export
                                                </Button>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {
                                        (user.loggedInUser?.orgRole === "PLA") && (
                                            <>
                                                <DropdownMenuItem>
                                                    <Settings className={"text-orange-400"} />
                                                    <Button
                                                        className={"overrideActionBtnStyles"}
                                                    >
                                                        <Link
                                                            href={updateProperty.path(data.id)}
                                                        >
                                                            Update Property
                                                        </Link>
                                                    </Button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Trash2 className={"text-red-600"}/>
                                                    <Button
                                                        className={"overrideActionBtnStyles"}
                                                        onClick={() => {
                                                            controls.setPropertyId(data.id);
                                                            controls.setOpenDeletePropertyDialog(true);
                                                        }}
                                                    >
                                                        Delete Property
                                                    </Button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div className={"flex flex-col"}>
                                                        <em><small>Property {addEllipsis(data.name)}</small></em>
                                                        <small>Created On: {propertyCreatedOn}</small>
                                                        <small>Last Update: {propertyUpdatedOn}</small>
                                                    </div>
                                                </DropdownMenuItem>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    };
};