import {StaticPageContent, PageContent, printSection} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    PageLabel = "Technology Stack",
    pageContents: StaticPageContent = [
        {
            key: "front-end",
            label: "Frontend",
            verbiage: "The following Frontend Technologies are leveraged by Link-N-Sync",
            listData: [
                "Next.JS (React/Typescript)",
                "Vercel"
            ]
        },
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
        }
    ];

const TechStackPage = () => {
    return (
        <section key={"tech-stack-page"} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <div className={"flex flex-col w-1/2 m-auto"}>
                {
                    pageContents.map((pageContent: PageContent) => printSection(pageContent))
                }
            </div>
        </section>
    );
}

export default TechStackPage;