"use client";
import React, {useEffect} from "react";
import {Container} from "../container/Container";
import {Logo} from "@/components/structural/navbar/_Logo";
import {ThemeToggler} from "@/components/structural/navbar/_DarkMode";
import {LinksDropdown} from "@/components/structural/navbar/_LinksDropdown";
import {useUser/*, useClerk*/} from "@clerk/nextjs";
import {setInitializedSessionData, useUserStore} from "@/store/userStore";
import {Alert} from "@/components/misc/Sonner.Alerter";

function Navbar() {
    const
        { sessionLoaded } = useUserStore(), // App Persist Session Object
        { isLoaded, isSignedIn, user } = useUser(); // Initial App Load - Check Clerk Then Parse To App user: SessionDataState for remainder of session.

    useEffect(() => {
        const
            unauthenticatedUser = isLoaded && !isSignedIn,
            fullyInitializedClerkSession = isLoaded && isSignedIn && !!user,
            appSessionDataInitializedFromClerk = sessionLoaded(),
            authenticatedUserWithoutAppSessionStateTracker = fullyInitializedClerkSession && !appSessionDataInitializedFromClerk,
            authenticatedUserWithAppSessionStateTracker = fullyInitializedClerkSession && appSessionDataInitializedFromClerk;

        if(unauthenticatedUser) {
            console.warn("User Is Not Logged In");

            // Ensure Clear of Session Data
            useUserStore.getState().logout();
        }

        if(authenticatedUserWithoutAppSessionStateTracker) {
            console.log("App Not Tracking User Session Yet...");
            setInitializedSessionData(user, false);
        }

        if(authenticatedUserWithAppSessionStateTracker) {
            console.log(
                "User Fully Initialized Through Clerk And Application",
                appSessionDataInitializedFromClerk,
                useUserStore.getState().getRemainingSessionTime()
            );

            if(useUserStore.getState().getRemainingSessionTime().sessionElapsed) {
                useUserStore.getState().logout();
                Alert({
                    message: "Your Session Has Expired. You will now be logged out.",
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
            }
        }
    }, [isLoaded, isSignedIn, user, sessionLoaded]);

    return (
        <nav className="border-b mb-5 borderBOverride">
            <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 mobile-override-nav">
                <Logo />
                <div className={"flex gap-4 items-center"}>
                    <ThemeToggler />
                    {
                        isLoaded && (
                            <LinksDropdown />
                        )
                    }
                </div>
            </Container>
        </nav>
    );
}

export default Navbar;