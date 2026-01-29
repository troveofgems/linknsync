import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "customers-pla",
    label: "Primary Listing Agents",
    verbiage: "What Can You Do?",
    listData: [
        "Create and Manage Your Organization",
        "Create and Manage Your Organization Members",
        "Create and Manage (Update/Delete) Your Properties",
        "Link and Sync Your Ical to a Property",
        "Link and Sync A Team Member's Ical to a Property",
        "Set an ICal as a Main Source for Cron Processing Priority",
        "Export a Consolidated ICal File For All or Some ICal Files Attached to a Property"
    ]
}];

export const PrimaryListingAgent = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);