import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "12. Do We Make Updates To This Policy?",
    IN_SHORT = "Yes, we will update this policy as necessary to stay compliant with relevant laws.",
    INTRODUCTION_VERBIAGE =  "We may update this Privacy Policy from time to time. The updated version will be indicated by " +
        "an updated 'Revised' date at the top of this Privacy Policy. " +
        "If we make material changes to this Privacy Policy, we may notify you either by prominently posting a notice " +
        "of such changes or by directly sending you a notification. We encourage you to review this privacy policy " +
        "frequently to be informed of how we are protecting your information.";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const PolicyUpdates = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);