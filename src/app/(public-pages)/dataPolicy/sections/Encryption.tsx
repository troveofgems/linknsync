import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "data-policy-encryption",
        label: "Is My Data Encrypted?",
        inShort: "Yes, certain elements of your data are encrypted at rest within the database.",
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
    }
];

export const Encryption = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);
