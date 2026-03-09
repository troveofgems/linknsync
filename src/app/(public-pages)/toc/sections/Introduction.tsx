import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Agreement To Our Legal Terms",
    INTRODUCTION_VERBIAGE = "We are Link-N-Sync ('Company', 'We', 'Us', 'Our').",
    MAIN_LIST = [
        "We operate Link-N-Sync app, as well as any other related products and services that refer to or link " +
        "to these legal terms (the 'Legal Terms')(collectively, the 'Services')",
        "You can contact us by email at linknsyncdev@gmail.com",
        "These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf " +
        "of an entity ('you'), concerning access to and use of the Services. you agree that by accessing the Services, " +
        "you have read, understood, and agreed to be bound by all of these Legal Terms.",
        "IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES " +
        "AND MUST DISCONTINUE USE IMMEDIATELY.",
        "Supplemental Terms and conditions or documents that may be posted on the Services from time to time are " +
        "hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make" +
        " changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any " +
        "changes by updated the 'Last Updated' date of these Legal Terms, and you waive any right to receive specific " +
        "notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed " +
        "of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the " +
        "changes in any revised Legal Terms by your continued use of the Services after the date of such revised Legal " +
        "Terms are posted.",
        "We recommend that you print a copy of these Legal Terms for your records."
    ]

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    paragraphs: MAIN_LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const Introduction = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
        printSectionWrapper(pageContents(pageKey, sectionLabel))
);