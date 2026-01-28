import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [ {
    key: "privacy-policy-retained-information",
    label: "6. How Long Do We Keep Your Information?",
    paragraphs: [
        "We will only keep your personal information for as long as it is necessary for the purposes set out in this" +
        "Privacy Policy, unless a longer retention period is required or necessitated by law (such as tax, accounting) " +
        "or other legal requirements). No purpose in this policy will require us keeping your personal information for " +
        "longer than the period of time in which users have an account with us.",
        "When we have no ongoing legitimate business need to process your personal information, we will either delete, " +
        "or anonymize such information, or if this is not possible (for example, because your personal information " +
        "has been stored in backup archives), then we will securely store your personal information and isolate it " +
        "from any further processing until deletion is possible."
    ],
    inShort: "We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy " +
        "Policy unless otherwise required by law."
}];

export const RetainedInformation = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);