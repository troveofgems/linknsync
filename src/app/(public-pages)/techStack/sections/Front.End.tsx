import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "tech-stack-front-end",
        label: "Front End",
        verbiage: "The following technologies are leveraged by the frontend:",
        inShort: "The frontend is built with NextJS, React, React-Router-Dom, and Typescript",
        paragraphList: [
            {
                paragraph: "Next.JS (React/Typescript)",
                desc: "Next.JS is bundled with React and Typescript",
                list: [
                    "Next.JS",
                    "React",
                    "Typescript",
                    "ShadCN UI/Tailwind CSS",
                    "Vercel"
                ]
            }
        ]
    }
];

export const FrontEnd = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);