import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "pricing-free",
    label: "Free Tier - $0/Month",
    verbiage: "The Free Tier Offers the Following Benefits: ",
    listData: [
        "3 Properties Max",
        "3 ICal Files Per Property",
        "Daily (Every 24 Hours) Synchronization of ICal Files",
    ]
}];

export const FreeOption = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);