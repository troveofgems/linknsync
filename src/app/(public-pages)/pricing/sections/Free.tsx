import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Free Tier - $0 / Month",
    INTRODUCTION_VERBIAGE = "The Free Tier Offers the Following Benefits: ",
    LIST = [
        "3 Properties Max",
        "3 ICal Files Per Property",
        "Daily (Every 24 Hours) Synchronization of ICal Files",
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
export const FreeOption = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);