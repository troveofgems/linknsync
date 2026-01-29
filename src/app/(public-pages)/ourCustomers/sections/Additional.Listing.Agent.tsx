import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "customers-ala",
    label: "Additional Listing Agents",
    verbiage: "What Can You Do?",
    listData: [
        "View Your Organization",
        "View Your Organization Members",
        "View Your Organization's Properties",
        "Link and Sync Your Ical to a Property",
        "Send a Booking Request for a Block of Dates",
        "Export a Consolidated ICal File For All or Some ICal Files Attached to a Property"
    ]
}];

export const AdditionalListingAgent = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);