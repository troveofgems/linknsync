"use client";
import { ProfileForm } from "@/components/forms/profile/ProfileForm";
import {SessionDataState, useUserStore} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {useSearchParams} from "next/navigation";

function ProfilePage() {
    const
        { user: { isLoading, attrs } } = useUserStore(),
        searchParams = useSearchParams();

    return (
        <div>
            {isLoading && <LoaderSkeleton loadingMessage={"Loading User Profile"} additionalClassNames={""} />}
            {!isLoading && <ProfileForm userProfile={attrs as SessionDataState} redirectFromOrgRegistration={(searchParams?.get("registeredOrg") as unknown as boolean || false)} /> }
        </div>
    );
}

export default ProfilePage;