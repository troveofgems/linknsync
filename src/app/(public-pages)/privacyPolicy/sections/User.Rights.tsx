import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-user-rights",
    label: "9. What Are Your Privacy Rights?",
    paragraphList: [
        {
            paragraph: "Withdrawing your consent",
            desc: "If we are relying on your consent to process your personal information, which may be express and/or implied " +
                "consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw " +
                "your consent at any time by contacting us by using the contact details provided in the section " +
                "'How Can You Contact Us About This Policy' below.",
            list: [
                "However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when " +
                "applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing " +
                "grounds other than consent."
            ]
        },
        {
            paragraph: "Account Information",
            desc: "If you would at any time like to review or change the information in your account or terminate " +
                "your account, you can:",
            list: [
                "Log into your account settings and update your account.",
                "Contact Us for Assistance",
                "Users can manage their teams through the organization navigation option.",
            ]
        },
        {
            paragraph: "Cookies & Similar Technologies",
            desc: "Most web browsers are set to accept cookies by default, ifyou prefer, you can usually choose to set " +
                "your browser to remove and reject cookies. If you choose to remove cookies or reject cookies, this could affect " +
                "certain features or services of our Product.",
            list: []
        },
    ],
    inShort: "You may review, change, or terminate your account at any time, depending on your country, province, or " +
        "state of residence.",
    paragraphs: [
        "Upon your request to terminate your account, we will deactivate or delete your account and information from " +
        "our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, " +
        "enforce our legal terms and/or comply with applicable legal requirements."
    ]
}];

export const UserRights = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);