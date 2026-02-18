import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Who Are We?",
    INTRODUCTION_VERBIAGE = "Link-N-Sync is the product of Brett Wright and Dustin Greco. We are a couple living in Arizona. " +
        "Brett has a passion for the Vacation Rental Industry and Dustin is an avid programmer. We have our four " +
        "pets: Bailey, Mister, Vandal, and Louie; they're a handful and keep us busy!";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    showCreators: true
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const AboutUs = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);