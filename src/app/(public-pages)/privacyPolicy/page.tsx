import {Introduction} from "@/app/(public-pages)/privacyPolicy/sections/Introduction";
import {SummaryOfKeyPointsSection} from "@/app/(public-pages)/privacyPolicy/sections/Summary.Of.Key.Points";
import {TableOfContents} from "@/app/(public-pages)/privacyPolicy/sections/Table.Of.Contents";
import {CollectedInformation} from "@/app/(public-pages)/privacyPolicy/sections/Collected.Information";
import {ProcessedInformation} from "@/app/(public-pages)/privacyPolicy/sections/Processed.Information";
import {SharedInformation} from "@/app/(public-pages)/privacyPolicy/sections/Shared.Information";
import {CookiesAndTracking} from "@/app/(public-pages)/privacyPolicy/sections/Cookies.Tracking";
import {SocialLogins} from "@/app/(public-pages)/privacyPolicy/sections/Social.Logins";
import {RetainedInformation} from "@/app/(public-pages)/privacyPolicy/sections/Retained.Information";
import {SafetyInformation} from "@/app/(public-pages)/privacyPolicy/sections/Safety.Information";
import {SafetyMinors} from "@/app/(public-pages)/privacyPolicy/sections/Safety.Minors";
import {UserRights} from "@/app/(public-pages)/privacyPolicy/sections/User.Rights";
import {DNTControls} from "@/app/(public-pages)/privacyPolicy/sections/DNT.Controls";
import {USAUsers} from "@/app/(public-pages)/privacyPolicy/sections/USA.Users";
import {PolicyUpdates} from "@/app/(public-pages)/privacyPolicy/sections/Policy.Updates";
import {ManageYourData} from "@/app/(public-pages)/privacyPolicy/sections/ManageYourData";
import {ContactUs} from "@/app/(public-pages)/privacyPolicy/sections/Contact.Us";

const
    lastUpdate = new Date("1/28/2026")
        .toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }),
    PageLabel = "Privacy Policy";

const PrivacyPolicyPage = () => {
    return (
        <section key={"data-policy-page"} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <h2 className={"w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
                <div className={"mt-5"}>
                    <span className={"font-bold"}>
                    Questions or concerns?
                </span> Reading this Privacy Policy will help you
                    understand your privacy rights and choices. We are responsible for making decisions about how your personal
                    information is processed. If you do not agree with our policies and practices please do not use our Services.
                    If you still have any questions or concerns please contact us at <a href={"mailto:linknsyncdev@gmail.com"} className={"link"}>linknsyncdev@gmail.com</a>
                </div>
            </h2>
            <Introduction />
            <SummaryOfKeyPointsSection />
            <TableOfContents />
            <CollectedInformation />
            <ProcessedInformation />
            <SharedInformation />
            <CookiesAndTracking />
            <SocialLogins />
            <RetainedInformation />
            <SafetyInformation />
            <SafetyMinors />
            <UserRights />
            <DNTControls />
            <USAUsers />
            <PolicyUpdates />
            <ContactUs />
            <ManageYourData />
        </section>
    );
};

export default PrivacyPolicyPage;