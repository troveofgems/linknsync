import {
    PageKey, SectionLabel,
    printSectionWrapper, StaticPageContent,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "Back End",
    IN_SHORT = "The backend is built with NodeJS, and some third party libraries.",
    INTRODUCTION_VERBIAGE = "The following technologies and third party services are leveraged by the backend:";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT,
    paragraphList: [
        {
            paragraph: "NodeJS",
            desc: "NodeJS is the main engine for the application.",
            list: [
                "ImgBB",
                "ImitateEmail",
                "ClerkJS",
                "Supabase PostGreSQL DB",
                "Mux Video Processing for Tutorials Videos"
            ]
        }
    ]
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const BackEnd = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);
