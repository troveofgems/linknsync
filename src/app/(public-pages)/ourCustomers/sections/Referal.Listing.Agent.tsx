import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "customers-rla",
    label: "Referral Listing Agents",
    verbiage: "What Can You Do?",
    listData: [
        "View an Attached Organization's Properties",
        "Send a Booking Request for a Block of Dates",
    ]
}];

export const ReferralListingAgent = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);