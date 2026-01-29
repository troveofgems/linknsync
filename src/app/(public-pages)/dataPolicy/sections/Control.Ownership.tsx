import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "data-policy-access-control-ownership",
        label: "Who Accesses and Controls My Data?",
        verbiage: "Access to data is granted on a least‑privilege basis. Ownership of data resides with the " +
            "business function that created it and the application role assigned to a user (PLA|ALA|RLA)"
    }
];

export const ControlOwnership = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);
