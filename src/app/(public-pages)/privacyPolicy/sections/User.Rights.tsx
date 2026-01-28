import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-user-rights",
    label: "9. What Are Your Privacy Rights?",
    verbiage: "",
    listData: [
        ""
    ],
    inShort: "You may review, change, or terminate your account at any time, depending on your country, province, or " +
        "state of residence."
}];

export const UserRights = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);