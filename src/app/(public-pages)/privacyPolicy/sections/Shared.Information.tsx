import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-shared-information",
    label: "3. When and With Whom Do We Share Your Personal Information?",
    verbiage: "We may need to share your personal information in the following situations:",
    listData: [
        "Business Transfers: We may share of transfer your information in connection with, or during negotiations of, " +
        "any merger, sale of company assets, or acquisition of all or a portion of our business to another company."
    ],
    inShort: "We may share information in specific situations described in this section. This data will not be shared " +
        "with any third party unless you expressly invite them onto the system as an RLA in your organization."
}];

export const SharedInformation = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);