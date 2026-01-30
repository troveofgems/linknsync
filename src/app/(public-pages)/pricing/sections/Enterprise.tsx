import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "pricing-enterprise",
    label: "Enterprise Tier $*/Month",
    verbiage: "The Enterprise Tier Offers the Following Benefits: ",
    listData: [
        "Priced Per Property",
        "Priced Per Linked ICal Per Property",
        "Hourly Synchronization of ICal Files",
        "Please Contact Us If You're Looking For an Enterprise Solution.",
    ]
}];

export const EnterpriseOption = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);