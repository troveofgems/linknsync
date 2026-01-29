import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "roadmap-v1",
    label: "Version 1",
    verbiage: "Our goal for Version 1 is to onboard Production Users and build a user base for our application." +
        "Changes we would like to introduce by Version 1 will include: ",
    inShort: "Focus On Building Our Production User Base",
    listData: [
        "Pushing Updates to TravelNet's Track PMS",
    ]
}];

export const Version1 = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);