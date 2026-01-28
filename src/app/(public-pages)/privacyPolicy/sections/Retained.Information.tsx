import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [ {
    key: "privacy-policy-retained-information",
    label: "6. How Long Do We Keep Your Information?",
    verbiage: "",
    listData: [
        ""
    ],
    inShort: "We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy " +
        "Policy unless otherwise required by law."
}];

export const RetainedInformation = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);