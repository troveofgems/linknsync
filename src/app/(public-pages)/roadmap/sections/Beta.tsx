import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Beta",
    IN_SHORT = "Onboard Test Users to test the User Experience",
    INTRODUCTION_VERBIAGE = "Our goal for Beta is to onboard a set of Test Users to test the experience and make any final " +
        "changes prior to releasing the first official version of the application. Our goals will focus on:",
    LIST = [
        "Prioritizing and fixing bugs reported during this time",
        "Gathering user feedback about the functionality of the application",
        "Gathering user feedback about the views of the application pages"
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    inShort: IN_SHORT,
    verbiage: INTRODUCTION_VERBIAGE,
    list: LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const Beta = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);