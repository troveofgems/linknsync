import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-user-data-management",
    label: "14. How Can You Review, Update, Or Delete The Data We Collect From You?",
    verbiage: `
    You have the right to request access to the personal information we collect from you, details about how we have 
    processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw 
    your consent to withdraw your consent to our processing of your personal information. These rights may be limited
    in some circumstances by applicable law. To request to review, update, or delete your personal information, please
    contact us at: 
    `,
    showContact: true,
}];

export const ManageYourData = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);