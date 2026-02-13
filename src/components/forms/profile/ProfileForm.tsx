"use client";
import React, {useEffect} from "react";
import Form from "next/form";
import Link from "next/link";
import {useRouter} from "next/navigation";

import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {AppRole, getUserRoleLabel} from "@/lib/utils/AppUser/app.user.utils";
import {SessionDataState, useUserStore} from "@/store/userStore";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import {APP_PATHS} from "@/utils/nav.path.utils";

export const ProfileForm = (
    {
        userProfile,
        redirectFromOrgRegistration
    }: {
        userProfile: SessionDataState,
        redirectFromOrgRegistration: boolean
    }
) => {
    const
        {isAdmin, orgRole} = userProfile!.loggedInUser!,
        userRoleLabel = getUserRoleLabel({
            isAdmin: isAdmin as boolean,
            orgRole: orgRole as AppRole
        }),
        { reloadSession } = useUserStore(),
        router = useRouter();

    useEffect(() => {
        if(redirectFromOrgRegistration) {
            reloadSession();
            return router.push(APP_PATHS.pages.authenticated.user.goToProfile.path as string);
        }
    });

    return (
        <div className={"relative"}>
            <div className={"background"}>
                <div className={`background shape profileForm_shape_style`}></div>
                <div className={`background shape profileForm_shape_style`}></div>
            </div>
            <Form id={"profileForm"} action={() => {}}>
                <div className={"w-full m-auto text-center mb-3"}>
                    <GenericTextInput
                        setAsInputTextField={true}
                        isDecorativeField={true}
                        name={"organizationRole"}
                        label={userRoleLabel}
                        id={"organizationRole"}
                        labelClassnames={"w-full font-extrabold orgRoleStyle"}
                    />
                </div>
                <div className={"w-full flex justify-center"}>
                    <PictureWrapper
                        photo={{
                            thumbnailUrl: `${userProfile!.profile!.imageUrl}`,
                            width: "150",
                            height: "150",
                            title: "User Profile Avatar"
                        }}
                        classNames={"p-1"}
                    />
                    <div className={"px-3"}>
                        <GenericTextInput
                            setAsInputTextField={true}
                            isDecorativeField={true}
                            label={userProfile!.profile!.fullName}
                            showLabel={true}
                            showAsRequired={false}
                            name={"fullName"}
                            id={"fullName"}
                            readOnly={true}
                        />
                        <GenericTextInput
                            setAsInputTextField={true}
                            isDecorativeField={true}
                            label={userProfile!.profile!.email}
                            showLabel={true}
                            showAsRequired={false}
                            name={"email"}
                            id={"email"}
                            readOnly={true}
                        />
                        <GenericTextInput
                            setAsInputTextField={true}
                            isDecorativeField={true}
                            label={userProfile!.profile!.phoneNumber}
                            showLabel={true}
                            showAsRequired={false}
                            name={"phoneNumber"}
                            id={"phoneNumber"}
                            readOnly={true}
                        />
                        <GenericTextInput
                            setAsInputTextField={true}
                            isDecorativeField={true}
                            label={userProfile!.profile!.username}
                            showLabel={true}
                            showAsRequired={false}
                            name={"username"}
                            id={"username"}
                            readOnly={true}
                        />
                    </div>
                </div>
                <hr className={"mt-5"}/>
                <div className={"grid w-2xl gap-2 grid-cols-2 py-5"}>
                    <div className={"grid gap-3"}>
                        <GenericTextInput
                            setAsInputTextField={true}
                            isDecorativeField={true}
                            label={userProfile!.profile!.actions.passwordEnabled ? "Password Enabled Account" : "SSO Account"}
                            showLabel={true}
                            showAsRequired={false}
                            name={"accountType"}
                            id={"accountType"}
                            defaultValue={userProfile!.profile!.actions.passwordEnabled ? "True" : "False"}
                            readOnly={true}
                        />
                        <GenericTextInput
                            setAsInputTextField={true}
                            label={"Account Created On"}
                            showLabel={true}
                            showAsRequired={false}
                            name={"accountCreatedOn"}
                            id={"accountCreatedOn"}
                            defaultValue={datetimeConversionTo_String({
                                timestamp: userProfile!.loggedInUser!.accountCreatedOn as Date
                            })}
                            readOnly={true}
                        />
                        <GenericTextInput
                            setAsInputTextField={true}
                            label={"Last Sign-In At"}
                            showLabel={true}
                            inputType={"text"}
                            showAsRequired={false}
                            name={"lastSignInAt"}
                            id={"lastSignInAt"}
                            defaultValue={datetimeConversionTo_String({
                                timestamp: userProfile!.loggedInUser!.lastSignInAt as Date
                            })}
                            readOnly={true}
                        />
                    </div>
                    <div className={"grid gap-1"}>
                        {
                            userProfile!.loggedInUser!.orgRole === "IND" ? (
                                <>
                                    <GenericTextInput
                                        setAsInputTextField={true}
                                        label={"Organization"}
                                        name={"organization"}
                                        id={"organization"}
                                        defaultValue={`Independent Agent: No Org Set`}
                                        readOnly={true}
                                    />
                                    <button className={"button-87 h-[4rem]"}>
                                        <Link href={"/dashboard/organization/create-organization"} className={"w-full"}>
                                            Create Organization
                                        </Link>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {
                                        userProfile!.loggedInUser!.orgRole === "RLA" && (
                                            <GenericTextInput
                                                setAsInputTextField={true}
                                                label={"Attached Organizations"}
                                                name={"attachedOrganizations"}
                                                id={"attachedOrganizations"}
                                                defaultValue={`${userProfile!.profile!.org.name}`}
                                                readOnly={true}
                                            />
                                        )
                                    }
                                    {
                                        (
                                            userProfile!.loggedInUser!.orgRole === "PLA" ||
                                            userProfile!.loggedInUser!.orgRole === "ALA"
                                        ) && (
                                            <GenericTextInput
                                                setAsInputTextField={true}
                                                label={"Organization"}
                                                showAsRequired={false}
                                                name={"organization"}
                                                id={"organization"}
                                                defaultValue={`${userProfile!.profile!.org.name}`}
                                                readOnly={true}
                                            />
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </Form>
        </div>
    );
}