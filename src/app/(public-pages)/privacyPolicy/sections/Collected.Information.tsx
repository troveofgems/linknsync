import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "1. What Information Do We Collect?",
    IN_SHORT = "We collect personal information that you provide to us.",
    INTRODUCTION_VERBIAGE = "We collect personal information that you voluntarily provide to us when you register on the " +
        "Application, express an interest in obtaining information about us or our product and services, when you " +
        "participate in activities on the Services, or otherwise when you contact us.",
    MAIN_LIST = [
        "All personal information that you provide to us must be true, complete, and accurate, and you must notify " +
        "us of any changes to such personal information."
    ],
    SUB_LIST = [
        {
            paragraph: "Personal Information Provided By You",
            desc: "The personal information that we collect depends on the context of your interactions with us and the " +
                "Services, the choices you make, and the product and features you use. The personal information we may collect " +
                "may include the following:",
            list: [
                "Your Name",
                "Your Organizational Application Role (PLA|ALA|RLA)",
                "Your Organizational Members",
                "Phone Numbers",
                "Email Addresses",
                "Usernames",
                "Passwords",
                "Contact or Authentication Data"
            ]
        },
        {
            paragraph: "Sensitive Information",
            desc: "When necessary, with your consent or as otherwise permitted by applicable law, we process the following " +
                "categories of sensitive information: ",
            list: [
                "Property Data",
                "ICal Data"
            ]
        },
        {
            paragraph: "Social Media Login Data",
            desc: "We may provide you with the option to register with us using your existing social media account details " +
                "like Google, or another social media account. If you choose to register this way, we will collect certain " +
                "profile information about you from the social media provider, as described in the section called " +
                "'How Do We Handle Your Social Logins?' below.",
            list: []
        }
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
    paragraphs: MAIN_LIST,
    paragraphList: SUB_LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const CollectedInformation = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);
