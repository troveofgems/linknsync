import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "pricing-basic",
    label: "Basic Tier",
    verbiage: "The Basic Tier Offers the Following Benefits: ",
    listData: [
        "50 Properties Max",
        "5 ICal Files Per Property",
        "Hourly Synchronization of ICal Files",
    ]
}];

export const BasicOption = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);