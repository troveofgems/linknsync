import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Retention, Log Management & Disposal",
    INTRODUCTION_VERBIAGE = "Operational logs are retained for 7 days and then securely deleted. Data that is no longer " +
        "required for business or legal purposes is purged in accordance with the retention schedule.";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const Retention = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);