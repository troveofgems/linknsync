"use client";
import React, {useEffect, useState} from "react";

import {Container} from "@/components/structural/container/Container";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {SyncServiceTable} from "@/components/tables/logs/Sync.Service.Table";
import {UserAuditTable} from "@/components/tables/logs/User.Audit.Table";
import {ConflictResolutionsTable} from "@/components/tables/logs/Conflict.Resolutions.Table";
import {LinkedPropertiesTable} from "@/components/tables/logs/Linked.Properties.Table";
import {useUserStore} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {PMSAuditTable} from "@/components/tables/logs/PMS.Audit.Table";

const LogsPage = () => {
    const
        { user: { isLoading, isAuthenticated, attrs, error } } = useUserStore(),
        [ coid, setCOID ] = useState(!isLoading ? attrs!.profile!.org.id : process.env.THROWAWAY_ORG_ID);

    useEffect(() => {
        if(coid === "" && !!attrs?.profile!.org.id) {
            setCOID(attrs.profile.org.id as string);
        }
    }, [attrs, coid]);

    return (
        <Container>
            <h1 className={"text-2xl pb-3"}>Logs</h1>
            <div className="flex w-full flex-col gap-6">
                <Tabs defaultValue="cronService">
                    <TabsList>
                        <TabsTrigger value="cronService" className={"mr-4"}>Linked Properties</TabsTrigger>
                        <TabsTrigger value="lnsService" className={"mr-4"}>Sync Service Logs</TabsTrigger>
                        <TabsTrigger value="conflictResolutions" className={"mr-4"}>Conflict Resolutions</TabsTrigger>
                        <TabsTrigger value="userActions" className={"mr-4"}>User Logs</TabsTrigger>
                        <TabsTrigger value="pmsActions">PMS Logs</TabsTrigger>
                    </TabsList>
                    {
                        isLoading && (
                            <LoaderSkeleton loadingMessage={"Loading Logs For User..."} additionalClassNames={""} />
                        )
                    }
                    {
                        !isLoading &&
                        isAuthenticated && (
                            <>
                                <TabsContent value="cronService" className={"min-w-8xl xl:max-w-8x"}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Linked Properties</CardTitle>
                                            <CardDescription>
                                                Your Linked Properties Are Listed Here
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            <LinkedPropertiesTable coid={coid as string} orgRole={attrs?.loggedInUser?.orgRole as string} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="lnsService" className={"min-w-8xl xl:max-w-8x"}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>LnS Sync Service</CardTitle>
                                            <CardDescription>
                                                Sync Service Notes
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            <SyncServiceTable coid={coid as string} orgRole={attrs?.loggedInUser?.orgRole as string} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="conflictResolutions" className={"min-w-8xl xl:max-w-8x"}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Conflict Resolutions</CardTitle>
                                            <CardDescription>
                                                Cron Detected Resolution Actions are Listed Here
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            <ConflictResolutionsTable coid={coid as string} orgRole={attrs?.loggedInUser?.orgRole as string} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="userActions">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>User Actions</CardTitle>
                                            <CardDescription>
                                                User Actions Taken Using This System Are Listed Here
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            <UserAuditTable coid={coid as string} orgRole={attrs?.loggedInUser?.orgRole as string} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="pmsActions">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>PMS Logs</CardTitle>
                                            <CardDescription>
                                                PMS Actions Taken Using This System Are Listed Here
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            <PMSAuditTable coid={coid as string} orgRole={attrs?.loggedInUser?.orgRole as string} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </>
                        )
                    }
                </Tabs>
                {!!error && (
                    <div className={""}>
                        <p>Something Went Wrong...</p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default LogsPage;


