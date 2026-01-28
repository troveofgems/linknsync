import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-usa-users",
    label: "11. Do United States Residents Have Specific Privacy Rights?",
    verbiage: "",
    paragraphList: [
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
            desc: "To exercise your rights: ",
            list: []
        },
        {
            paragraph: "Request Verification",
            desc: "To request verification: ",
            list: []
        },
        {
            paragraph: "Appeals",
            desc: "To appeal: ",
            list: []
        },
        {
            paragraph: "California's 'Shine the Light' Law",
            desc: "California's 'Shine the Light' Law: ",
            list: []
        },
    ],
    inShort: "If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, " +
        "Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, " +
        "Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about " +
        "the personal information we maintain about you and how we have processed it, correct inaccuracies, " +
        "get a copy of, or delete your personal information. You may also have the right to withdraw your consent to " +
        "our processing of your personal information. These rights may be limited in some circumstances by applicable law. " +
        "More information is provided below."
}];

export const USAUsers = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);