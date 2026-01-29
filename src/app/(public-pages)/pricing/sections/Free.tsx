import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "pricing-free",
    label: "Free Tier",
    verbiage: "The Free Tier Offers the Following Benefits: ",
    listData: [
        "3 Properties Max",
        "3 ICal Files Per Property",
        "Daily (Every 24 Hours) Synchronization of ICal Files",
    ]
}];

export const FreeOption = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);