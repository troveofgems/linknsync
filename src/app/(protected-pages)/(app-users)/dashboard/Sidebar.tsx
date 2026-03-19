'use client';
import React, {useState, useEffect, useCallback} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {SessionDataState} from "@/store/userStore";
import {fetchCollisionCountsByOrgIdAction} from "@/actions/conflict/read.action";
import {APP_PATHS, NavLink} from "@/utils/nav.path.utils";

type SidebarLink = {
    path: string;
    label: string;
    permissions: string[];
};

const { /*goToProfile,*/ /*goToCalendar,*/ goToConflicts, goToProperty, goToLogs } = APP_PATHS.pages.authenticated.user;

const linkList = [
    /*goToProfile,*/
    goToProperty.list,
    /*goToCalendar,*/
    goToConflicts,
    goToLogs
] as SidebarLink[];

export const SidebarManager = (
    {
        user
    }: {
        user: SessionDataState;
    }) => {
    const
        pathname = usePathname(),
        [collisionCountByOrgId, setCollisionCountByOrgId] = useState(0);

    const updateCollisionCount = useCallback((count: number) => setCollisionCountByOrgId(count), []);

    useEffect(() => {
        fetchCollisionCountsByOrgIdAction(user?.profile?.org?.id as string)
            .then((result) => {
                updateCollisionCount(result.response as number);
            });
    });

    const applyActivePageStyles = (link: NavLink): boolean => (pathname === link.path);

    return (
        <aside>
            {
                linkList.map((link) => {
                    const
                        isActivePage = applyActivePageStyles(link),
                        allowLink = link.permissions.includes(user!.loggedInUser!.orgRole as string),
                        variant = isActivePage ? "default" : "ghost";

                    return (
                        allowLink && (
                            <Button asChild
                                    key={`${link.label}_button`}
                                    className={"w-full mb-2 capitalize font-normal text-start"}
                                    variant={variant}
                            >
                                <Link key={`${link.label}_link`} href={link.path} className={"text-start"}>
                                    {link.label} {link.label === "Conflict Detection" &&
                                    (
                                        <Badge variant={"destructive"}>
                                            {collisionCountByOrgId}
                                        </Badge>
                                    )}
                                </Link>
                            </Button>
                        )
                    )
                })
            }
        </aside>
    );
};
