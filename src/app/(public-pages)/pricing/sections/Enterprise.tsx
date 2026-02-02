import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "Enterprise Tier - $* / Per Property / Month",
    INTRODUCTION_VERBIAGE = "The Enterprise Tier Offers the Following Benefits: ",
    LIST = [
        "Priced Per Property",
        "Priced Per Linked ICal Per Property",
        "Hourly Synchronization of ICal Files",
        "Please Contact Us If You're Looking For an Enterprise Solution.",
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
export const EnterpriseOption = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);