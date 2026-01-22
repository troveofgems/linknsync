"use server";
import db from "@/db/connect.db";
import {SessionDataState, UserProfileState} from "@/store/userStore";

export const imprintUser = async (
    {
        user,
        orgId,
    }: {
        user: SessionDataState;
        orgId?: string;
    }
) => {
    const
        { loggedInUser, profile } = user,
        cid = user!.loggedInUser!.userId,
        imprintedOrganization = await imprintOrganization({
            profile: !!profile ? profile : {} as UserProfileState,
            orgId
        }),
        userAlreadyExists = await db.userImprint.findFirst({
            where: { cid }
        });

    console.log("User Already Exists? ", userAlreadyExists);

    if(userAlreadyExists) {
        return {
            message: "User Already Exists. Skipping...",
            response: {
                imprintedOrgId: imprintedOrganization.response.imprintedOrgId,
                imprintedUserId: userAlreadyExists.id
            }
        };
    }

    const userImprint = !!imprintedOrganization.response.imprintedOrgId ? {
        firstName: profile!.fullName.split(" ")[0],
        lastName: profile!.fullName.split(" ")[1],
        fullName: profile!.fullName,
        contactEmail: profile!.email,
        contactPhone: profile!.phoneNumber,
        appRole: loggedInUser!.orgRole as string,
        cid: loggedInUser!.userId as string,
        orgImprintId: imprintedOrganization.response.imprintedOrgId,
    } : {
        firstName: profile!.fullName.split(" ")[0],
        lastName: profile!.fullName.split(" ")[1],
        fullName: profile!.fullName,
        contactEmail: profile!.email,
        contactPhone: profile!.phoneNumber,
        appRole: loggedInUser!.orgRole as string,
        cid: loggedInUser!.userId as string,
    };

    const imprintedUser = await db.userImprint.create({
        data: userImprint
    });

    return {
        message: "Imprinted User",
        response: {
            imprintedOrg: imprintedOrganization.response,
            imprintedUserId: imprintedUser.id
        }
    };
};

export const imprintOrganization = async (
    {
        profile,
        orgId
    }: {
        profile: UserProfileState;
        orgId?: string;
    }
) => {
    const // Does Organization Need To Be Imprinted?
        coid = orgId,
        organizationAlreadyExists = await db.orgImprint.findFirst({
            where: { coid },
            select: {
                id: true,
                name: true,
            }
        });

    console.log("Does Org Already Exist? ", organizationAlreadyExists, coid);

    if(organizationAlreadyExists) {
        return {
            message: `Organization Already Exists. Skipping Build...`,
            response: {
                imprintedOrgId: organizationAlreadyExists.id,
                imprintedOrgName: organizationAlreadyExists.name,
            }
        };
    }

    const  // Org Does Not Exist, so Prep to Build It
        organizationImprint = {
            name: profile!.org.name,
            coid: coid as string, // This is the Issue, Not Getting OrgId
        };

    if(!!coid) {
        const
            imprintedOrganization = await db.orgImprint.create({
                data: organizationImprint,
            });

        return {
            message: `Imprinted Organization: ${organizationImprint.name}`,
            response: {
                imprintedOrgId: imprintedOrganization.id,
                imprintedOrgName: organizationImprint.name
            }
        };
    }

    return {
        message: `Unable To Build Organization. PLA Has Not Yet Created One Or IND User Has Not Yet Converted to PLA.`,
        response: {
            imprintedOrgId: null,
            imprintedOrgName: null
        }
    };

};