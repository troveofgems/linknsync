import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "16. User Data",
    MAIN_LIST = [
        "We will maintain certain data that you transmit to the Services for the purpose of managing the performance " +
        "of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, " +
        "you are solely responsible for all data that you transmit or that relates to any activity you have undertaken " +
        "using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, " +
        "and you hereby waive any right of action against us arising from any such loss or corruption of such data."
    ]

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    paragraphs: MAIN_LIST,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const UserData = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);