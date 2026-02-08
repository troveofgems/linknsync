import {
    PageKey, SectionLabel, StaticPageContent,
    printSectionWrapper
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "",
    INTRODUCTION_VERBIAGE = "If you have questions, concerns, or suggestions, you may email us at: ",
    CONTACT_EMAIL = "linknsyncdev@gmail.com",
    CONTACT_SUBJECT = "Contacted From Terms and Conditions"

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    showContact: true,
    contactEmail: CONTACT_EMAIL,
    contactSubject: CONTACT_SUBJECT,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const ContactUs = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);