"use client";
import Link from "next/link";
import {SignOutButton} from "@clerk/nextjs";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useUserStore} from "@/store/userStore";
import {APP_PATHS} from "@/constants/nav.path.constants";

export const LogOutLink = () => {
    const
        alertLogout = () => {
            Alert({
                message: "Logging Out...",
                description: new Date().toISOString(),
                actionLabel: "Close",
            });
    }

    const handleLogout = () => {
        useUserStore.persist.clearStorage();
        useUserStore.getState().logout();
        alertLogout();
    };

    const logoutPath = APP_PATHS.generalPages.goToHomepage.path;

    return (
        <DropdownMenuItem key={"session_logout_action"}>
            <SignOutButton>
                <Link href={logoutPath} className={"w-full"} onClick={handleLogout}>
                    Logout
                </Link>
            </SignOutButton>
        </DropdownMenuItem>
    );
};