"use server";
import {
    fetchPropertyListAction,
    ReadPropertyActionState, ReadPropertyListParams
} from "@/actions/property/read.action";
import {SessionDataState} from "@/store/userStore";

export const fetchPropertyList = async (
    user: SessionDataState
) => {
    return await fetchPropertyListAction(
        { pState: user } as ReadPropertyActionState,
        {
            coid: user!.profile!.org.id,
            cid: user!.loggedInUser!.userId,
            orgRole: user!.loggedInUser!.orgRole,
            orgPermissions: user!.profile!.org.permissions,
            sessionId: user!.loggedInUser!.sessionId,
            username: user!.profile!.username,
        } as ReadPropertyListParams
    );
};