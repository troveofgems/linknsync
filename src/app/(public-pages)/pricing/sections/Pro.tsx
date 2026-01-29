import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "pricing-pro",
    label: "Pro Tier",
    verbiage: "The Pro Tier Offers the Following Benefits: ",
    listData: [
        "50 Properties Max",
        "5 ICal Files Per Property",
        "Hourly Synchronization of ICal Files",
    ]
}];

export const ProOption = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);