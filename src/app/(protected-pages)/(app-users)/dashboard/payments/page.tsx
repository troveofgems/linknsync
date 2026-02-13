"use client";
import {SessionDataState, useUserStore} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {useSearchParams} from "next/navigation";

function PaymentsPage() {
    const
        { user: { isLoading, attrs } } = useUserStore(),
        searchParams = useSearchParams();

    return (
        <div>
            <h2>Services Subscription</h2>
            {isLoading && <LoaderSkeleton loadingMessage={"Loading Payments Screen"} additionalClassNames={""} />}
            {/*{!isLoading && <ProfileForm userProfile={attrs as SessionDataState} redirectFromOrgRegistration={(searchParams?.get("registeredOrg") as unknown as boolean || false)} /> }*/}
        </div>
    );
}

export default PaymentsPage;