import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "Purpose and Scope",
    INTRODUCTION_VERBIAGE = "This policy defines how Link N' Sync collects, processes, stores, and disposes of data related " +
        "to its vacation‑rental platform. It applies to all employees, contractors, and third‑party vendors " +
        "handling data in the United States and Mexico.",
    LIST = [
        "Covers User Data, Organization Data, Property Data, PMS Data, and ICAL Data.",
        "Applies to production, staging, and development environments."
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
export const PurposeAndScope = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);
