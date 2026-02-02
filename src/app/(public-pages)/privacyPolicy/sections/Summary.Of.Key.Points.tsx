import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "Summary of Key Points",
    INTRODUCTION_VERBIAGE = "This summary provides key points from our Privacy Policy, but you can find out more details " +
        "about any of these topics by clicking the link following each each point or by using our table of " +
        "contents below to find the section you are looking for.";

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
export const SummaryOfKeyPointsSection = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);