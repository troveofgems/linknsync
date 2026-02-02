import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";


const
    HEADER = "4. Do We Use Cookies and Other Tracking Technologies?",
    IN_SHORT = "We may use cookies and other tracking technologies to collect and store your information.",
    INTRODUCTION_VERBIAGE =  "We may use cookies and similar tracking technologies to gather information when you interact with " +
        "our Services. Some online tracking technologies help us maintain the security of our Services and your account " +
        "prevent crashes, fix bugs, save your preferences, and assist with basic site functions.",
    MAIN_LIST = [
        "We do permit third parties and service providers to use online tracking technologies on our Services for analytics. " +
        "Specific information about how we use such technologies and how you can refuse certain cookies can be found " +
        "in the cookie notice."
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
    paragraphs: MAIN_LIST
}]);


// DO NOT CHANGE TEMPLATE CODE BELOW
export const CookiesAndTracking = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);