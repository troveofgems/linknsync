import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "6. How Long Do We Keep Your Information?",
    IN_SHORT = "We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy " +
        "Policy unless otherwise required by law.",
    MAIN_LIST = [
        "We will only keep your personal information for as long as it is necessary for the purposes set out in this" +
        "Privacy Policy, unless a longer retention period is required or necessitated by law (such as tax, accounting) " +
        "or other legal requirements). No purpose in this policy will require us keeping your personal information for " +
        "longer than the period of time in which users have an account with us.",
        "When we have no ongoing legitimate business need to process your personal information, we will either delete, " +
        "or anonymize such information, or if this is not possible (for example, because your personal information " +
        "has been stored in backup archives), then we will securely store your personal information and isolate it " +
        "from any further processing until deletion is possible."
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    inShort: IN_SHORT,
    paragraphs: MAIN_LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const RetainedInformation = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);