import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";


const
    HEADER = "7. How Do We Keep Your Information Safe?",
    IN_SHORT = "We aim to protect your personal information through a system of organizational and technical security " +
        "measures (e.g. Data encrypted at rest in the DB).",
    INTRODUCTION_VERBIAGE =  "We have implemented appropriate and reasonable technical and organizational security measures designed to " +
        "protect the security of any personal information we process. However, despite our safeguards and efforts to secure " +
        "your information, no electronic transmission over the internet or information storage technology can be " +
        "guaranteed to be 100% secure, so we cannot promise to guarantee that hackers, cybercriminals, or other unauthorized " +
        "third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. " +
        "Although we will do our best to protect your personal information, transmission of personal information to " +
        "and from our services is at your own risk. you should only access the Services within a secure environment.";

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
export const SafetyInformation = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);