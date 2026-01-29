import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "data-policy-enforcement-and-training",
        label: "Enforcement & Training",
        verbiage: "Compliance with this policy is mandatory. Violations may result in disciplinary action up to " +
            "termination of services. Ongoing training ensures all stakeholders understand their responsibilities."
    }
];

export const Enforcement = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);
