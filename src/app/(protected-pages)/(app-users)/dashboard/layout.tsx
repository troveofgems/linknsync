"use client";
import React from "react";
import {Separator} from "@/components/ui/separator";
import {SidebarManager} from "@/app/(protected-pages)/(app-users)/dashboard/Sidebar";
import {SessionDataState, useUserStore} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";

const ApplicationDashboardLayout = (
    {
        children
    }: {
        children: React.ReactNode
    }) => {
    const { user: { isLoading, isAuthenticated, attrs } } = useUserStore();
    return (
        <>
            {
                isLoading && (
                    <div className={"flex flex-row"}>
                        <div className={"w-1/4"}>
                            <LoaderSkeleton
                                loadingMessage={"Reloading User Sidebar..."}
                                additionalClassNames={"m-10"}
                            />
                        </div>
                        <div className={"w-3/4"}>
                            <LoaderSkeleton
                                loadingMessage={"Reloading User Dashboard View..."}
                                additionalClassNames={"m-10"}
                            />
                        </div>
                    </div>
                )
            }
            {
                !isLoading &&
                isAuthenticated && (
                    <>
                        <h2 className={"text-2xl pl-4"}>Dashboard</h2>
                        {
                            attrs!.loggedInUser!.orgRole === "IND" && (
                                <>
                                    <h3 className={"text-1xl pl-4"}>for {attrs!.profile!.fullName}</h3>
                                </>
                            )
                        }
                        {
                            (
                                attrs!.loggedInUser!.orgRole === "PLA" ||
                                attrs!.loggedInUser!.orgRole === "ALA"
                            ) && (
                                <>
                                    <h3 className={"text-1xl pl-4"}>{attrs!.profile!.fullName} of</h3>
                                    <h3 className={"text-1xl pl-4"}>{attrs!.profile!.org.name}</h3>
                                </>
                            )
                        }
                        <Separator className={"mt-2"} />
                        <section className={"grid lg:grid-cols-12 gap-12 mt-12 mb-40"}>
                            <div className={"lg:col-span-2"}>
                                 <SidebarManager user={attrs as SessionDataState} />
                            </div>
                            <div className={"lg:col-span-10 px-4"}>
                                {children}
                            </div>
                        </section>
                    </>
                )
            }
        </>
    );
};

export default ApplicationDashboardLayout;
