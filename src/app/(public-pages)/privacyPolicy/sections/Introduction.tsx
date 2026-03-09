import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Introduction",
    INTRODUCTION_VERBIAGE = "This Privacy Policy for Link-N-Sync ('we', 'us', 'our'), describes how and why we might access, " +
        "collect, store, use, and/or share ('process') your personal information when you use our services " +
        "('Services'), including when you:",
    MAIN_LIST = [
        `Visit our website at https://www.linknsync.app or any website of ours that links to this privacy policy`,
        "Use Link-N-Sync Service. A platform that manages ical data for small to medium sized Short Term Vacation " +
        "Rental Teams. Icals between users of the same team are consolidated and bashed to detect collisions " +
        "between bookings and the team.",
        "Engage with us in other related ways, including marketing or events"
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    list: MAIN_LIST,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const Introduction = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);