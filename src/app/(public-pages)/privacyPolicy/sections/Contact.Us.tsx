import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-contact-us",
    label: "13. How Can You Contact Us About This Notice?",
    verbiage: "If you have questions or comments about this policy, you may email us at: ",
    showContact: true
}];

export const ContactUs = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);