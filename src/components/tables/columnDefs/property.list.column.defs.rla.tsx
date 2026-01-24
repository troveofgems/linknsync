"use client";
import React from "react";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, View} from "lucide-react";
import Link from "next/link";

// Utils
import {Address} from "@prisma/client";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import {APP_PATHS} from "@/constants/nav.path.constants";
import {AccessorColumnDef, DisplayColumnDef, GroupColumnDef} from "@tanstack/react-table";

const { viewPropertyById } = APP_PATHS.authenticatedPages.appUser.goToProperty;

// Column Def List
export const propertyListColumnDefsRLA = (): DisplayColumnDef<unknown> | GroupColumnDef<unknown> | AccessorColumnDef<unknown> [] => ([
    {
        accessorKey: "thumbnail",
        header: () => (<div></div>),
        cell: ({ row }) => {
            const data = row.original as unknown as { Photo:  {
                    title?: string
                    srcUrl?: string
                    thumbnailUrl?: string
                    width: string
                    height: string
                }};


            let photo = undefined;
            if (data !== undefined && data !== null) {
                photo = data.Photo;
            }
            return (
                <PictureWrapper
                    photo={photo}
                />
            );
        }
    },
    {
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
            const data = row.original as unknown as { name: string;};
            return (
                <div className="capitalize">
                    {data.name}
                </div>
            );
        }
    },
    {
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
                data = row.original as { Address: Address; },
                { Address: propertyAddress } = data;

            return (
                <p>
                    {propertyAddress.state}
                </p>
            )
        },
    },
    {
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
                data = row.original as unknown as { Address: Address; },
                { Address: propertyAddress } = data;

            return (
                <p>
                    {propertyAddress.postalCode}
                </p>
            )
        },
    },
    {
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
                data = row.original as unknown as { Address: Address; },
                { Address: propertyAddress } = data;

            return (
                <p>
                    {propertyAddress.country}
                </p>
            )
        },
    },
    {
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
                data = row.original as unknown as { Address: Address; },
                { Address: propertyAddress } = data;

            return (
                <p>
                    {!!propertyAddress.street2 && propertyAddress.street2.length > 0 ? "Multi-Unit" : "Single Unit"}
                </p>
            )
        },
    },
    {
        accessorKey: "actions",
        enableHiding: false,
        header: () => {
            return (
                <div className={"text-end"}>
                    View Calendar
                </div>
            )
        },
        cell: ({ row }) => {
            const data = row.original as { id: string; };

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
    }
]);