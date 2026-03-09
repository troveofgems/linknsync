import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Who Accesses and Controls My Data?",
    INTRODUCTION_VERBIAGE = "Access to data is granted on a least‑privilege basis. Ownership of data resides with the " +
        "business function that created it and the application role assigned to a user (PLA|ALA|RLA).",
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
export const ControlOwnership = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);
