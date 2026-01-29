import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-key-points",
    label: "Summary of Key Points",
    verbiage: "This summary provides key points from our Privacy Policy, but you can find out more details " +
        "about any of these topics by clicking the link following each each point or by using our table of " +
        "contents below to find the section you are looking for.",
}];

export const SummaryOfKeyPointsSection = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
)