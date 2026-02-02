import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "What Third Party Tools Does This Application Use?",
    INTRODUCTION_VERBIAGE = "Link N' Sync relies on several external services.",
    LIST = [
        "ImitateEmail – Email transmission only, no storage of PII.",
        "ImageBB – Stores only image binaries; URLs are not PII.",
        "ClerkJS – Handles authentication.",
        "Supabase (PostgreSQL) – Primary data store; encrypted at rest.",
        "Vercel – Hosts the web UI; no data persistence."
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    list: LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const ThirdPartyTools = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);