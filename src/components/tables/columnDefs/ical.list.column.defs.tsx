"use client";
import React from "react";

import {
    FILE_STASIS_CONTENT,
    FILE_STASIS_TRIGGER,
    LINKED_TO_CRON_CONTENT,
    LINKED_TO_CRON_TRIGGER,
} from "@/components/structural/tooltip/elements/Cron.elements";
import {Button} from "@/components/ui/button";
import {
    ArrowUpDown,
    CheckIcon,
    FileCog,
    HardDriveDownload,
    Key,
    MoreHorizontal,
    ShredderIcon,
    XIcon
} from "lucide-react";
import TooltipShell from "@/components/structural/tooltip/Tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {SessionDataState} from "@/store/userStore";
import {AccessorColumnDef, DisplayColumnDef, GroupColumnDef} from "@tanstack/react-table";

export const IcalListColumnDefs = (
    user: SessionDataState,
    controls: {
        setICalId:  React.Dispatch<React.SetStateAction<string>>,
        setOpenEditICalDialog: React.Dispatch<React.SetStateAction<boolean>>
        setOpenDeleteICalDialog: React.Dispatch<React.SetStateAction<boolean>>
        setOpenChangeICalDialog: React.Dispatch<React.SetStateAction<boolean>>
    },
    page: string,
): DisplayColumnDef<unknown> | GroupColumnDef<unknown> | AccessorColumnDef<unknown> [] => ([
    {
        accessorKey: "UserImprint.fullName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    File Owner
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            let
                uName = "Loading...",
                uRole = "";

            const data = row.original as unknown as { UserImprint: { fullName: string; appRole: string; } };
            if (data !== undefined && data !== null) {
                uName = data.UserImprint.fullName;
                uRole = data.UserImprint.appRole;
            }
            return (
                <div className="capitalize">{uRole} - {uName}</div>
            );
        },
    },
    {
        accessorKey: "icalFilename",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Filename
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            let label = "...";
            const data = row.original as unknown as { icalFilename: string; };

            if (data !== undefined && data !== null) {
                label = data.icalFilename;
            }

            return (
                <div className="capitalize">{label}</div>
            )
        },
    },
    {
        accessorKey: "slug",
        header: () => <div>Slug</div>,
        cell: ({row}) => {
            const data = row.original as unknown as { slug: string; };

            const slugMask = (data.slug === "" || data.slug === null) ? "No Value" : data.slug;

            return (
                <div className={"text-start"}>
                    {slugMask}
                </div>
            )
        },
    },
    {
        accessorKey: "isMainSrc",
        header: () => <div>Main Source</div>,
        cell: ({row}) => {
            const data = row.original as unknown as { isMainSrc: boolean; };

            return (
                <div className={"text-center"}>
                    {
                        data.isMainSrc ? (
                            <div>
                                <CheckIcon className={"text-green-500"}/>
                            </div>
                        ) : (
                            <div>
                                <XIcon className={"text-red-500"}/>
                            </div>
                        )
                    }
                </div>
            )
        },
    },
    {
        accessorKey: "importType",
        header: () => <div className={"text-center"}>Sync Type</div>,
        cell: ({row}) => {
            let linkedCron = false;
            const data = row.original;

            if (data !== undefined && data !== null) {
                linkedCron = row.getValue("importType") === "link";
            }

            return <div className={"text-center"}>
                {(!!data && linkedCron) ? (
                    <TooltipShell
                        tooltipTrigger={LINKED_TO_CRON_TRIGGER()}
                        tooltipContent={LINKED_TO_CRON_CONTENT()}
                    />
                ) : (!!data && !linkedCron) ? (
                    <TooltipShell
                        tooltipTrigger={FILE_STASIS_TRIGGER()}
                        tooltipContent={FILE_STASIS_CONTENT()}
                    />
                ) : "..."}
            </div>
        },
    },
    {
        accessorKey: "actions",
        enableHiding: false,
        cell: ({row}) => {
            let label = "...";
            const data = row.original as unknown as {
                id: string;
                icalUrl: string;
                importType: string;
                isMainSrc: boolean;
                UserImprint: {
                  id: string;
                };
                createdAt: Date;
                updatedAt: Date;
            };

            let
                icalUrl = "#",
                createdOn = "No Data",
                lastUpdate = "No Updates Yet",
                showIcon = true;

            if (data !== undefined && data !== null) {
                icalUrl = data.icalUrl as string;
                const icalFilenameParts = icalUrl.split("/");

                label = icalFilenameParts[icalFilenameParts.length - 1];

                createdOn = datetimeConversionTo_String({timestamp: data.createdAt as Date});
                if (data.createdAt.getTime() !== data.updatedAt.getTime()) {
                    lastUpdate = datetimeConversionTo_String({timestamp: data.updatedAt as Date});
                }

                showIcon = data.importType !== "file";
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {
                            data.importType === "link" && (
                                <DropdownMenuItem>
                                    <div className={"flex flex-col w-full"}>
                                        <div className={"flex flex-row w-full items-center"}>
                                            <HardDriveDownload className={"text-blue-400 mr-2"}/>
                                            <Button className={"overrideActionBtnStyles"}>
                                                <Link href={icalUrl}>
                                                    Source Download
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            )
                        }
                        {
                            page === "manage" && (
                                <div key={"manageICalActions"}>
                                    {
                                        user.loggedInUser?.orgRole === "PLA" && (
                                            <div>
                                                <DropdownMenuItem>
                                                    <div className={"flex flex-col w-full"}>
                                                        <div className={"flex flex-row w-full items-center"}>
                                                            <FileCog className={"text-orange-400 mr-2"}/>
                                                            <Button
                                                                className={"overrideActionBtnStyles"}
                                                                onClick={() => {
                                                                    controls.setICalId(data.id);
                                                                    controls.setOpenEditICalDialog(true);
                                                                }}
                                                            >
                                                                Update ical
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div className={"flex flex-col w-full"}>
                                                        <div className={"flex flex-row w-full items-center"}>
                                                            <ShredderIcon className={"text-red-500 mr-2"}/>
                                                            <Button
                                                                className={"overrideActionBtnStyles"}
                                                                onClick={() => {
                                                                    controls.setICalId(data.id);
                                                                    controls.setOpenDeleteICalDialog(true);
                                                                }}
                                                            >
                                                                Delete ical
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DropdownMenuItem>
                                                {
                                                    !data.isMainSrc && (
                                                        <DropdownMenuItem>
                                                            <div className={"flex flex-col w-full"}>
                                                                <div className={"flex flex-row w-full items-center"}>
                                                                    <Key className={"text-gray-50 mr-2"}/>
                                                                    <Button
                                                                        className={"overrideActionBtnStyles"}
                                                                        onClick={() => {
                                                                            controls.setICalId(data.id);
                                                                            controls.setOpenChangeICalDialog(true);
                                                                        }}
                                                                    >
                                                                        Set As Main Source
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        (
                                            user.loggedInUser?.orgRole === "ALA" &&
                                            data.UserImprint?.id === user.loggedInUser?.userId
                                        ) && (
                                            <div>
                                                <DropdownMenuItem>
                                                    <div className={"flex flex-col w-full"}>
                                                        <div className={"flex flex-row w-full items-center"}>
                                                            <FileCog className={"text-orange-400 mr-2"}/>
                                                            <Button
                                                                className={"overrideActionBtnStyles"}
                                                                onClick={() => {
                                                                    controls.setICalId(data.id);
                                                                    controls.setOpenEditICalDialog(true);
                                                                }}
                                                            >
                                                                Update ical
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div className={"flex flex-col w-full"}>
                                                        <div className={"flex flex-row w-full items-center"}>
                                                            <ShredderIcon className={"text-red-500 mr-2"}/>
                                                            <Button
                                                                className={"overrideActionBtnStyles"}
                                                                onClick={() => {
                                                                    controls.setICalId(data.id);
                                                                    controls.setOpenDeleteICalDialog(true);
                                                                }}
                                                            >
                                                                Delete ical
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DropdownMenuItem>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        <DropdownMenuSeparator/>
                        {
                            showIcon && (
                                <div>
                                    <DropdownMenuItem
                                        className={"flex flex-col w-full"}
                                    >
                                        <em className={"w-full text-start mb-2"}>ical {label}</em>
                                        <div className={"flex flex-col w-full"}>
                                            <small className={"w-full mb-1"}>Created On: {createdOn}</small>
                                            <small>Last Update: {lastUpdate}</small>
                                        </div>
                                    </DropdownMenuItem>
                                </div>
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]);