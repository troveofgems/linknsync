import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "14. How Can You Review, Update, Or Delete The Data We Collect From You?",
    INTRODUCTION_VERBIAGE =  `
    You have the right to request access to the personal information we collect from you, details about how we have 
    processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw 
    your consent to withdraw your consent to our processing of your personal information. These rights may be limited
    in some circumstances by applicable law. To request to review, update, or delete your personal information, please
    contact us at: 
    `;

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    showContact: true
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const ManageYourData = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);