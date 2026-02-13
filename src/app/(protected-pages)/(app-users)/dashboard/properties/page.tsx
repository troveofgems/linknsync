'use client';
import React, {useState, useCallback, Fragment} from "react";
import {Badge} from "@/components/ui/badge";
import {PropertyListTable} from "@/components/tables/PropertyListTable";
import {LoggedInUserState, SessionDataState, useUserStore} from "@/store/userStore";
import {RbacPermissions} from "@/rbac/rbac.permissions";
import {APP_PATHS} from "@/utils/nav.path.utils";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useRouter} from "next/navigation";

function PropertyManagementPage() {
    const
        { user: { isLoading, isAuthenticated, attrs, error } } = useUserStore(),
        { orgRole, isAdmin } = attrs?.loggedInUser as LoggedInUserState,
        { getLabelForRole } = RbacPermissions,
        { defaultLabelPermissions, labels } = RbacPermissions.roleBasedLabels.forProperty,
        [propertyCount, setPropertyCount] = useState(0),
        propertyCountCallback = useCallback((c: number) => setPropertyCount(c), []),
        [showINDWarning, setShowINDWarning] = useState(false),
        router = useRouter();

    const createPropertyButton = (orgRole: string, isAdmin: boolean) => {
        const
            { create: createProperty } = APP_PATHS.pages.authenticated.user.goToProperty,
            { checkAndAllowAccessTo } = RbacPermissions;

        console.log("Property Button: ", orgRole, attrs);

        return (isAdmin || checkAndAllowAccessTo(orgRole, createProperty.permissions as string[])) ? (
            <div className={"flex justify-end-safe mb-8"}>
                <button
                    className={"button-87"}
                    onClick={
                        orgRole === "IND" ?
                        handleShowINDWarning :
                            handleContinueToCreateProperty
                    }
                >
                    Create Property
                </button>
            </div>
        ) : null;
    };

    const handleShowINDWarning = () => {
        setShowINDWarning(true);
    }

    const handleCancel = () => {
        setShowINDWarning(false);
    }

    const handleContinueToCreateOrg = () => {
        setShowINDWarning(false);
        return router.push(APP_PATHS.pages.authenticated.user.goToOrganization.manageOrganization.path as string);
    }

    const handleContinueToCreateProperty = () => {
        setShowINDWarning(false);
        return router.push(APP_PATHS.pages.authenticated.user.goToProperty.create.path as string);
    }

    return (
        <div className={"grid"}>
            {
                !isLoading &&
                isAuthenticated && (
                    <>
                        <h2 className={"text-2xl flex align-middle mb-8"}>
                            {
                                getLabelForRole(
                                    orgRole as string,
                                    defaultLabelPermissions,
                                    labels
                                )
                            }
                            <Badge className={"ml-3"} variant={"outline"}>{propertyCount}</Badge>
                        </h2>
                        {createPropertyButton(orgRole as string, isAdmin as boolean)}
                        {
                            !!error && (
                                <div className={"w-full flex justify-center mb-4"}>
                                    <p className="text-1xl flex text-red-500">No User Data Loaded. Failover Error...</p>
                                </div>
                            )
                        }
                        <PropertyListTable
                            user={attrs as SessionDataState}
                            updatePropertyCount={propertyCountCallback}
                        />
                        {
                            showINDWarning &&
                            (
                                <AlertDialog open={showINDWarning}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Hold On!</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                You are required to create your organization before you create your first property;
                                                You do not need an LLC, or any official documentation. You will now be
                                                redirected to create your organization. Please hit continue.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleContinueToCreateOrg}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}

export default PropertyManagementPage;