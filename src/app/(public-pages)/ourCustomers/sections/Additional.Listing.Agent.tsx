import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Additional Listing Agents",
    INTRODUCTION_VERBIAGE = "What Can You Do?",
    LIST =  [
        "View Your Organization",
        "View Your Organization Members",
        "View Your Organization's Properties",
        "Link and Sync Your Ical to a Property",
        "Send a Booking Request for a Block of Dates",
        "Export a Consolidated ICal File For All or Some ICal Files Attached to a Property"
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
export const AdditionalListingAgent = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);