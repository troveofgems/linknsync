import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "data-policy-retention-logs-and-disposal",
        label: "Retention, Log Management & Disposal",
        verbiage: "Operational logs are retained for 7 days and then securely deleted. Data that is no longer " +
            "required for business or legal purposes is purged in accordance with the retention schedule."
    }
];

export const Retention = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);
