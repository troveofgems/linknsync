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
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {LAST_UPDATE__PRIVACY_POLICY} from "@/constants/static.page.history.constants";

const PAGE_LABEL = "Privacy Policy";

const
    lastUpdate = new Date(LAST_UPDATE__PRIVACY_POLICY)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const PrivacyPolicyPage = () => {
    return (
        <section key={pageKey} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <h2 className={"lg:w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <Introduction pageKey={pageKey} sectionLabel={"Introduction"} />
            <SummaryOfKeyPointsSection pageKey={pageKey} sectionLabel={"Introduction"} />
            <TableOfContents pageKey={pageKey} sectionLabel={"Table of Contents"} />
            <CollectedInformation pageKey={pageKey} sectionLabel={"Collected Information"} />
            <ProcessedInformation pageKey={pageKey} sectionLabel={"Processed Information"} />
            <SharedInformation pageKey={pageKey} sectionLabel={"Shared Information"} />
            <CookiesAndTracking pageKey={pageKey} sectionLabel={"Cookies and Tracking"}/>
            <SocialLogins pageKey={pageKey} sectionLabel={"Social Logins"} />
            <RetainedInformation pageKey={pageKey} sectionLabel={"Retained Information"} />
            <SafetyInformation pageKey={pageKey} sectionLabel={"Safety Information"}/>
            <SafetyMinors pageKey={pageKey} sectionLabel={"Safety Minors"}/>
            <UserRights pageKey={pageKey} sectionLabel={"User Rights"}/>
            <DNTControls pageKey={pageKey} sectionLabel={"DNT Controls"}/>
            <USAUsers pageKey={pageKey} sectionLabel={"USA Users"}/>
            <PolicyUpdates pageKey={pageKey} sectionLabel={"Policy Updates"}/>
            <ContactUs pageKey={pageKey} sectionLabel={"Contact Us"}/>
            <ManageYourData pageKey={pageKey} sectionLabel={"Manage Your Data"}/>
            <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Questions or Concerns"} />
        </section>
    );
};

export default PrivacyPolicyPage;