import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {Introduction} from "@/app/(public-pages)/toc/sections/Introduction";
import {TableOfContents} from "@/app/(public-pages)/toc/sections/Table.Of.Contents";
import {ContactUs} from "@/app/(public-pages)/toc/sections/Contact.Us";
import {OurServices} from "@/app/(public-pages)/toc/sections/Our.Services";
import {IntellectualPropertyRights} from "@/app/(public-pages)/toc/sections/Intellectual.Property.Rights";
import {UserRepresentations} from "@/app/(public-pages)/toc/sections/User.Representations";
import {UserGeneratedContributions} from "@/app/(public-pages)/toc/sections/User.Generated.Contributions";
import {ContributionLicense} from "@/app/(public-pages)/toc/sections/Contribution.License";
import {ServicesManagement} from "@/app/(public-pages)/toc/sections/Services.Management";
import {TermTermination} from "@/app/(public-pages)/toc/sections/Term.Termination";
import {ModificationInterruptions} from "@/app/(public-pages)/toc/sections/Modifications.Interruptions";
import {Corrections} from "@/app/(public-pages)/toc/sections/Corrections";
import {LimitationLiability} from "@/app/(public-pages)/toc/sections/Limitations.Liability";
import {Disclaimer} from "@/app/(public-pages)/toc/sections/Disclaimer";
import {UserData} from "@/app/(public-pages)/toc/sections/User.Data";
import {Indemnification} from "@/app/(public-pages)/toc/sections/Indemnification";
import {ProhibitedActivities} from "@/app/(public-pages)/toc/sections/Prohibited.Activities";
import {DisputeResolution} from "@/app/(public-pages)/toc/sections/Dispute.Resolution";
import {GoverningLaw} from "@/app/(public-pages)/toc/sections/Governing.Law";
import {ElectronicCommunications} from "@/app/(public-pages)/toc/sections/Electronic.Communications";
import {Miscellaneous} from "@/app/(public-pages)/toc/sections/Miscellaneous";
import {LAST_UPDATE__TERMS_AND_CONDITIONS} from "@/constants/Static.Page.History.Constants";

const PAGE_LABEL = "Terms and Conditions";

const
    lastUpdate = new Date(LAST_UPDATE__TERMS_AND_CONDITIONS)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

function ToCPage() {
    return (
        <section className={"toc-section"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <h2 className={"lg:w-1/2 lg:m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <Introduction pageKey={pageKey} sectionLabel={"Introduction"} />
            <TableOfContents pageKey={pageKey} sectionLabel={"Table of Contents"} />
            <OurServices pageKey={pageKey} sectionLabel={"Our Services"} />
            <IntellectualPropertyRights pageKey={pageKey} sectionLabel={"Intellectual Property Rights"} />
            <UserRepresentations pageKey={pageKey} sectionLabel={"User Representations"} />
            <ProhibitedActivities pageKey={pageKey} sectionLabel={"Prohibited Activities"} />
            <UserGeneratedContributions pageKey={pageKey} sectionLabel={"User Generated Contributions"} />
            <ContributionLicense pageKey={pageKey} sectionLabel={"Contribution License"} />
            <ServicesManagement pageKey={pageKey} sectionLabel={"Services Management"} />
            <TermTermination pageKey={pageKey} sectionLabel={"Term Termination"} />
            <ModificationInterruptions pageKey={pageKey} sectionLabel={"Modifications And Interruptions"} />
            <GoverningLaw pageKey={pageKey} sectionLabel={"Governing Law"} />
            <DisputeResolution pageKey={pageKey} sectionLabel={"Dispute Resolution"} />
            <Corrections pageKey={pageKey} sectionLabel={"Corrections"} />
            <Disclaimer pageKey={pageKey} sectionLabel={"Disclaimer"} />
            <LimitationLiability pageKey={pageKey} sectionLabel={"Limitation Liability"} />
            <Indemnification pageKey={pageKey} sectionLabel={"Indemnification"} />
            <UserData pageKey={pageKey} sectionLabel={"User Data"} />
            <ElectronicCommunications pageKey={pageKey} sectionLabel={"Electronic Communications"} />
            <Miscellaneous pageKey={pageKey} sectionLabel={"Miscellaneous"} />
            <ContactUs pageKey={pageKey} sectionLabel={"Contact Us"} />
            <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Questions Or Concerns"} />
        </section>
    );
}

export default ToCPage;