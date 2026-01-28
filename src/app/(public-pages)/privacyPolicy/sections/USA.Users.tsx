import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-usa-users",
    label: "11. Do United States Residents Have Specific Privacy Rights?",
    verbiage: "",
    listData: [
        ""
    ],
}];

export const USAUsers = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);