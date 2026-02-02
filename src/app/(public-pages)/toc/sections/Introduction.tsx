import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "Agreement To Our Legal Terms",
    INTRODUCTION_VERBIAGE = "We are Link-N-Sync ('Company', 'We', 'Us', 'Our')";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const Introduction = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
        printSectionWrapper(pageContents(pageKey, sectionLabel))
);