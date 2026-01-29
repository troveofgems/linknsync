import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "roadmap-v2",
    label: "Version 2",
    verbiage: "Our goal for Version 2 is to introduce new functionality and features to the application." +
        "Changes we would like to introduce by Version 2 will include: ",
    inShort: "Introduce New Features and Functionality",
    listData: [
        "A new Calendar Page and Route that utilizes FullCalendar.io's Resource Timeline Widget"
    ]
}];

export const Version2 = () => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);