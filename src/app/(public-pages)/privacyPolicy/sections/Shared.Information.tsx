import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";


const
    HEADER = "3. When and With Whom Do We Share Your Personal Information?",
    IN_SHORT = "We may share information in specific situations described in this section. This data will not be shared " +
        "with any third party unless you expressly invite them onto the system as an RLA in your organization.",
    INTRODUCTION_VERBIAGE =  "We may need to share your personal information in the following situations:",
    MAIN_LIST = [
        "Business Transfers: We may share of transfer your information in connection with, or during negotiations of, " +
        "any merger, sale of company assets, or acquisition of all or a portion of our business to another company."
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT,
    list: MAIN_LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const SharedInformation = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);