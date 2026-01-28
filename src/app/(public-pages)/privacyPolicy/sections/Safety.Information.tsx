import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-safety-information",
    label: "7. How Do We Keep Your Information Safe?",
    verbiage: "",
    listData: [
        ""
    ],
    inShort: "We aim to protect your personal information through a system of organizational and technical security " +
        "measures (e.g. Data encrypted at rest in the DB)."
}];

export const SafetyInformation = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);