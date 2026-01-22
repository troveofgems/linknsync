"use server";
import {fetchCollisionsByOrgIdAction} from "@/actions/conflict/read.action";
import {SessionDataState} from "@/store/userStore";
export const CollisionList = async (
    {
        user
    }: {
        user: SessionDataState;
    }
) => {
    const conflictList = await fetchCollisionsByOrgIdAction(user.profile?.org.id as string);
    return {
        message: "Successfully loaded Conflict List",
        response: {
            conflictList
        }
    };
}