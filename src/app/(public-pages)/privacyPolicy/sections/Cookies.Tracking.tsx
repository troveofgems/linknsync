import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-cookies-and-tracking",
    label: "4. Do We Use Cookies and Other Tracking Technologies?",
    verbiage: "We may use cookies and similar tracking technologies to gather information when you interact with " +
        "our Services. Some online tracking technologies help us maintain the security of our Services and your account " +
        "prevent crashes, fix bugs, save your preferences, and assist with basic site functions.",
    paragraphs: [
        "We do permit third parties and service providers to use online tracking technologies on our Services for analytics. " +
        "Specific information about how we use such technologies and how you can refuse certain cookies can be found " +
        "in the cookie notice."
    ],
    inShort: "We may use cookies and other tracking technologies to collect and store your information."
}];

export const CookiesAndTracking = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);