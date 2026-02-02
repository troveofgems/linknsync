import {AdditionalListingAgent} from "@/app/(public-pages)/ourCustomers/sections/Additional.Listing.Agent";
import {ReferralListingAgent} from "@/app/(public-pages)/ourCustomers/sections/Referal.Listing.Agent";
import {PrimaryListingAgent} from "@/app/(public-pages)/ourCustomers/sections/Primary.Listing.Agent";
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";

const
    PAGE_LABEL = "Short-Term Vacation Rental Property Managers",
    LAST_UPDATE = "1/28/2026";

const
    lastUpdate = new Date(LAST_UPDATE)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const OurCustomers = () => {
    return (
        <section key={pageKey} className={"mb-15"}>
            <h1 className={"lg:w-1/2 m-auto flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <h2 className={"lg:w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <PrimaryListingAgent pageKey={pageKey} sectionLabel={"Primary Listing Agents"} />
            <AdditionalListingAgent pageKey={pageKey} sectionLabel={"Additional Listing Agents"} />
            <ReferralListingAgent pageKey={pageKey} sectionLabel={"Referral Listing Agents"} />
            <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Questions Or Concerns"} />
        </section>
    );
}

export default OurCustomers;