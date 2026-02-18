import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Version 1",
    IN_SHORT = "Focus On Building Our Production User Base",
    INTRODUCTION_VERBIAGE = "Our goal for Version 1 is to onboard Production Users and build a user base for our application." +
        "Changes we would like to introduce by Version 1 will include: ",
    LIST = [
        "Pushing Updates to TravelNet's Track PMS",
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
export const Version1 = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);