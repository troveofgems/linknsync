import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "pricing-enterprise",
    label: "Enterprise Tier",
    verbiage: "The Enterprise Tier Offers the Following Benefits: ",
    listData: [
        "Please Contact Us If You're Looking For an Enterprise Solution.",
    ]
}];

export const EnterpriseOption = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);