import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "tech-stack-back-end",
        label: "Back End",
        verbiage: "The following technologies and third party services are leveraged by the backend:",
        inShort: "The backend is built with NodeJS, and some third party libraries.",
        paragraphList: [
            {
                paragraph: "NodeJS",
                desc: "NodeJS is the main engine for the application.",
                list: [
                    "ImgBB",
                    "ImitateEmail",
                    "ClerkJS",
                    "Supabase - PostGreSQL DB"
                ]
            }
        ]
    }
];

export const BackEnd = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);

/*
{
    key: "back-end",
        label: "Backend",
    verbiage: "The following Backend Technologies are leveraged by Link-N-Sync",
    listData: [
    "NodeJS",
    "Supabase-PostgreSQL / Prisma ORM",
    "ImgBB, ClerkJS, ImitateEmail",
    ""
]
}*/
