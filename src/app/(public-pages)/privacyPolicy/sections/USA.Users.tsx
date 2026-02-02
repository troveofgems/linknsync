import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "11. Do United States Residents Have Specific Privacy Rights?",
    IN_SHORT = "If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, " +
        "Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, " +
        "Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about " +
        "the personal information we maintain about you and how we have processed it, correct inaccuracies, " +
        "get a copy of, or delete your personal information. You may also have the right to withdraw your consent to " +
        "our processing of your personal information. These rights may be limited in some circumstances by applicable law. " +
        "More information is provided below.",
    SUB_LIST = [
        {
            paragraph: "Categories of Personal Information We Collect",
            desc: "The table below shows the categories of personal information we have collected in the past (12) " +
                "months. The table includes illustrative examples of each category and does not reflect the personal " +
                "information we collect from you. For a comprehensive inventory of all personal information we process," +
                "please refer to the section 'What Information Do We Collect?'",
            list: [],
            printTable: true
        },
        {
            paragraph: "Sources of Personal Information",
            desc: "Learn more about the sources of personal information we collect in the section, 'What Information Do We Collect?'",
            list: []
        },
        {
            paragraph: "Your Rights",
            desc: "You have rights under certain US state data protection laws. However, these rights are not absolute, and " +
                "in extreme cases, we may decline your request as permitted by law. These rights include:",
            list: [
                "Right To Know",
                "Right To Access",
                "Right To Request",
                "Right To Obtain A Copy of Personal Data Previously Shared With Us",
                "Right to non-discrimination",
                "Right to opt-out"
            ]
        },
        {
            paragraph: "Extended Rights",
            desc: "Depending on the state where you live, you may also have the following rights: ",
            list: []
        },
        {
            paragraph: "How to Exercise Your Rights",
            desc: "To exercise these rights, you can contact us by submitting a data subject access request, by emailing us, " +
                "or by referring to the contact details at the bottom of this document. Under certain US state data protection " +
                "laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from " +
                "an authorized agent that does not submit proof that they have been validly authorized to act on your behalf " +
                "in accordance with applicable laws.",
            list: []
        },
        {
            paragraph: "Request Verification",
            desc: "Upon receiving your request, we will need to verify your identity to determine you are the same " +
                "person about whom we have the information in our system. We will only use personal information provided " +
                "in your request to verify your identity or authority to make the request. However, if we cannot verify " +
                "your identity from the information already maintained by us, we may request that you provide additional " +
                "information for the purposes of verifying your identity and for security or fraud-prevention purposes.",
            list: [
                "If you submit the request through an Authorized Agent, we may need to collect additional information " +
                "to verify your identity before processing your request and the agent will need to provide a written " +
                "and signed permission from you to submit such a request on your behalf."
            ]
        },
        {
            paragraph: "Appeals",
            desc: "Under certain US State data protection laws, if we decline to take action regarding your request " +
                "you may appeal our decision by emailing us. We will inform you in writing of any action taken or not " +
                "taken in response to the appeal, including a written explanation of the reasons for the decisions. " +
                "If your appeal is denied, you may submit a complaint to your state attorney general.",
            list: []
        },
        {
            paragraph: "California's 'Shine the Light' Law",
            desc: "California Civil Code Section 1798.83, also known as the 'Shine the Light' Law, permits our users " +
                "who are California residents to request and obtain from us, once a year and free of charge, information " +
                "about certain categories of personal information (if any) we disclosed to third parties for direct " +
                "marketing purposes and the names and addresses of all third parties with which we shared personal " +
                "information in the immediately preceding calendar year. If you are a California resident and would " +
                "like to make such a request, please submit your request to us by using the contact details provided in " +
                "the section 'How Can You Contact Us About This Policy?'",
            list: []
        },
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    inShort: IN_SHORT,
    paragraphList: SUB_LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const USAUsers = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);