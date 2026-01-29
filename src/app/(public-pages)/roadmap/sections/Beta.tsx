import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "roadmap-beta",
    label: "Beta",
    verbiage: "Our goal for Beta is to onboard a set of Test Users to test the experience and make any final " +
        "changes prior to releasing the first official version of the application. Our goals will focus on:",
    listData: [
        "Prioritizing and fixing bugs reported during this time",
        "Gathering user feedback about the functionality of the application",
        "Gathering user feedback about the views of the application pages"
    ],
    inShort: "Onboard Test Users to test the User Experience"
}];

export const BetaVersion = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);