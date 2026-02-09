"use server";
import db from "@/db/connect.db";
import {currentUser, auth} from "@clerk/nextjs/server";
import {SessionDataState} from "@/store/userStore";
import {imprintUser} from "@/actions/user/user.actions";
import {formatPhoneNumber} from "@/lib/utils/AppUser/app.user.phone.number.utils";
import {AppRole, getUserRole} from "@/lib/utils/AppUser/app.user.utils";
import {ORG_ROLE__ID_SUPER_USER} from "@/constants/app.user.constants";

const REJECTED_REQUEST_MESSAGE = "Reject Request";

export const fetchSessionData = async() => {
    const // Do New Pull From Backend to Clerk to Verify Actual Session Data.
        { userId, orgRole, orgId, orgPermissions, sessionClaims } = await auth(),
        userData = await currentUser();

    console.log("User Data? ", userData);

    // 1st Check - No ClerkId Reject Request
    if(!userId) { return new Error(REJECTED_REQUEST_MESSAGE); }

    // 2nd Check - No Full Name
    let fName = "No Data";
    if(!!userData?.fullName) {
        fName = userData?.fullName;
    } else {
        fName = userData?.firstName + " " + userData?.lastName;
    }

    // 3rd Check - No Phone Number or Email Address
    let
        pNumber = "No Data",
        email = "No Data";

    if(!!userData?.primaryPhoneNumber?.phoneNumber) {
        pNumber = formatPhoneNumber({ phoneNumber: userData!.primaryPhoneNumber!.phoneNumber }).formatted;
    }

    if(!!userData?.primaryEmailAddress?.emailAddress) {
        email = userData.primaryEmailAddress.emailAddress;
    } else {
        email = userData!.emailAddresses[0].emailAddress;
    }

    const // Verified Clerk User Exists, Check For App-Side Supplementary Entries
        organizationEntry = await db.orgImprint.findFirst({
            where: { coid: orgId },
            select: { id: true }
        }),
        userEntry = await db.userImprint.findFirst({
            where: { cid: userId },
            select: { id: true }
        }),
        attrs = {
            loggedInUser: {
                userId: userEntry?.id || userId,
                orgRole: getUserRole({
                    isAdmin: (orgRole === ORG_ROLE__ID_SUPER_USER),
                    orgRole: orgRole as AppRole
                }),
                isAdmin: orgRole === ORG_ROLE__ID_SUPER_USER,
                accountCreatedOn: userData!.createdAt,
                lastSignInAt: userData!.lastSignInAt,
                sessionId: sessionClaims.sid,
                lastActivity: Date.now(),
            },
            profile: {
                fullName: fName,
                email: email,
                phoneNumber: pNumber,
                lastSignInAt: userData?.lastSignInAt,
                username: userData?.username,
                hasImage: userData?.hasImage,
                imageUrl: userData?.imageUrl,
                actions: {
                    locked: userData?.locked,
                    banned: userData?.banned,
                    passwordEnabled: userData?.passwordEnabled,
                },
                org: {
                    id: organizationEntry?.id,
                    name: sessionClaims.orgName,
                    permissions: orgPermissions,
                }
            }
        } as SessionDataState;

    if(!userEntry) { // If Supplementary Table Entries DNE, Build Entries Then Attach Ids To Previously Instantiated Object !organizationEntry ||
        const entriesCreated = await imprintUser({ user: attrs, orgId });

        return {
            loggedInUser: {
                ...attrs.loggedInUser,
                userId: entriesCreated.response.imprintedUserId
            },
            profile: {
                ...attrs.profile,
                org: {
                    id: entriesCreated?.response?.imprintedOrg?.imprintedOrgId as string,
                    name: entriesCreated?.response?.imprintedOrg?.imprintedOrgName as string,
                }
            }
        };
    }

    return attrs;
};

/*
export const fetchUserAuthRaw = async() => {
    return await auth();
};

export const fetchUserDataRaw = async() => {
    return await currentUser();
};*/
