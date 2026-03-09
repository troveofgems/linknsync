import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Enforcement & Training",
    INTRODUCTION_VERBIAGE = "Compliance with this policy is mandatory. Violations may result in disciplinary action up to " +
        "termination of services. Ongoing training ensures all stakeholders understand their responsibilities.";

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
export const Enforcement = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);
