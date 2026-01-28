import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-collected-information",
    label: "1. What Information Do We Collect?",
    verbiage: "We collect personal information that you voluntarily provide to us when you register on the " +
        "Application, express an interest in obtaining information about us or our product and services, when you " +
        "participate in activities on the Services, or otherwise when you contact us.",
    inShort: "We collect personal information that you provide to us."
}];

export const CollectedInformation = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);