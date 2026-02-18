import {
    PageKey, SectionLabel,
    printSectionWrapper, StaticPageContent,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Front End",
    IN_SHORT = "The frontend is built with NextJS, React, React-Router-Dom, and Typescript",
    INTRODUCTION_VERBIAGE = "The following technologies are leveraged by the frontend:";

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
            paragraph: "Next.JS (React/Typescript)",
            desc: "Next.JS is bundled with React and Typescript",
            list: [
                "NextJS v15",
                "React v19",
                "Typescript v5",
                "ShadCN UI/Tailwind CSS v4",
                "Vercel"
            ]
        }
    ]
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const FrontEnd = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);