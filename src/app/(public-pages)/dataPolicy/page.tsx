import {StaticPageContent, PageContent, printSection} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    PageLabel = "Data Policy",
    pageContents: StaticPageContent = [
        {
            key: "purpose-and-scope",
            label: "Purpose & Scope",
            verbiage: "This policy defines how Link N&#39; Sync collects, processes, stores, and disposes of data related to " +
                "its vacation‑rental platform. It applies to all employees, contractors, and third‑party vendors handling " +
                "data in the United States and Mexico.",
            listData: [
                "Covers User Data, Organization Data, Property Data, PMS Data, and ICAL Data.",
                "Applies to production, staging, and development environments."
            ]
        },
        {
            key: "data-classification-encryption",
            label: "Data Classification & Encryption",
            verbiage: "Data is classified as Sensitive PII when it includes personal identifiers such as name, email, " +
                "or phone number. All Sensitive PII is encrypted at rest using industry‑standard AES‑256 encryption. " +
                "Non‑PII data (e.g., public property URLs) is stored without encryption but is still subject to access " +
                "controls.",
            listData: [
                "User Data (Full Name, Email, Phone, Role) – Encrypted",
                "Organization Data (Org Name, COID) – Encrypted",
                "Property Data (address fields, photos, ICAL details) – Encrypted",
                "ICAL Data – Encrypted when stored; exported only via secure channels"
            ]
        },
        {
            key: "access-control-ownership",
            label: "Access Control & Ownership",
            verbiage: "Access to data is granted on a least‑privilege basis. Ownership of data resides with the " +
                "business function that created it."
        },
        {
            key: "third-party-tools",
            label: "Third-Party Management",
            verbiage: "Link N' Sync relies on several external services.",
            listData: [
                "ImitateEmail – Email transmission only, no storage of PII.",
                "ImageBB – Stores only image binaries; URLs are not PII.",
                "ClerkJS – Handles authentication.",
                "Supabase (PostgreSQL) – Primary data store; encrypted at rest.",
                "Vercel – Hosts the web UI; no data persistence."
            ]
        },
        {
            key: "retention-logs-and-disposal",
            label: "Retention, Log Management & Disposal",
            verbiage: "Operational logs are retained for 7 days and then securely deleted. Data that is no longer " +
                "required for business or legal purposes is purged in accordance with the retention schedule."
        },
        {
            key: "enforcement-and-training",
            label: "Enforcement & Training",
            verbiage: "Compliance with this policy is mandatory. Violations may result in disciplinary action up to " +
                "termination of services. Ongoing training ensures all stakeholders understand their responsibilities."
        }
    ];

const DataPolicyPage = () => {
    return (
        <section key={"data-policy-page"} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <div className={"flex flex-col w-1/2 m-auto"}>
                {
                    pageContents.map((pageContent: PageContent) => printSection(pageContent))
                }
            </div>
        </section>
    );
};

export default DataPolicyPage;