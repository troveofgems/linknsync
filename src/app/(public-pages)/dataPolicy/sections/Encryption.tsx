import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Is My Data Encrypted?",
    IN_SHORT = "Yes, certain elements of your data are encrypted at rest within the database.",
    INTRODUCTION_VERBIAGE = "Data is classified as Sensitive PII when it includes personal identifiers such as name, email, " +
        "or phone number. All Sensitive PII is encrypted at rest using industry‑standard AES‑256 encryption. " +
        "Non‑PII data (e.g., public property URLs) is stored without encryption but is still subject to access " +
        "controls.",
    LIST = [
        "User Data (Full Name, Email, Phone, Role) – Encrypted",
        "Organization Data (Org Name, COID) – Encrypted",
        "Property Data (address fields, photos, ICAL details) – Encrypted",
        "ICAL Data – Encrypted when stored; exported only via secure channels"
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT,
    list: LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const Encryption = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);
