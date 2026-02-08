"use client";
import React from "react";
import {SignedIn, SignedOut, SignInButton, /*SignUpButton*/} from "@clerk/nextjs";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";

import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {LogOutLink} from "@/components/structural/navbar/_LogOutLink";

import {adminLinks, privateLinks} from "@/lib/utils/Routes/link.utils";
import {useUserStore} from "@/store/userStore";
import {UserIcon} from "@/components/structural/navbar/_UserIcon";

export const LinksDropdown = () => {
    const
        { user: { isAuthenticated, isLoading, attrs } } = useUserStore(),
        isAdmin = attrs?.loggedInUser?.isAdmin;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"outline"}
                    className={"flex gap-4 max-w-[100px]"}
                >
                    <LuAlignLeft className={"w-6 h-6"} />
                    <UserIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-fit"} align={"start"} sideOffset={10}>
                <SignedIn>
                    {
                        privateLinks(attrs?.loggedInUser?.orgRole as string).map((link, i) => (
                            <DropdownMenuItem key={`private_link_to_${link.label}_${i}`}>
                                <Link
                                    className={"capitalize w-full"}
                                    href={link.path}>
                                    {link.label}
                                </Link>
                            </DropdownMenuItem>
                        ))
                    }
                    {
                        isAuthenticated &&
                        isAdmin &&
                        !isLoading && (
                            adminLinks().map((link, i) => (
                                <DropdownMenuItem key={`admin_link_to_${link.label}_${i}`}>
                                    <Link
                                        className={"capitalize w-full"}
                                        href={link.path}>
                                        {link.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        )
                    }
                    <DropdownMenuSeparator />
                    <LogOutLink />
                </SignedIn>
                <SignedOut>
                    <DropdownMenuItem>
                        <SignInButton mode={"modal"}>
                            <button className={"w-full text-left"}>Login</button>
                        </SignInButton>
                    </DropdownMenuItem>
                    {/*
                    Re-enable This At A Later Date
                    <DropdownMenuItem>
                        <SignUpButton mode={"modal"}>
                            <button className={"w-full text-left"}>Register</button>
                        </SignUpButton>
                    </DropdownMenuItem>*/}
                </SignedOut>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};