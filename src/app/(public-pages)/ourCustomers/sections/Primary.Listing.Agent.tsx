import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Primary Listing Agents",
    INTRODUCTION_VERBIAGE = "What Can You Do?",
    LIST = [
        "Create and Manage Your Organization",
        "Create and Manage Your Organization Members",
        "Create and Manage (Update/Delete) Your Properties",
        "Link and Sync Your Ical to a Property",
        "Link and Sync A Team Member's Ical to a Property",
        "Set an ICal as a Main Source for Cron Processing Priority",
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
export const PrimaryListingAgent = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);