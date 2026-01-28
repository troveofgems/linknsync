import {StaticPageContent, PageContent, printSection} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    PageLabel = "About Us",
    pageContents: StaticPageContent = [
        {
            key: "About Us",
            label: "Who are we?",
            verbiage: "Link-N-Sync is the product of Brett Wright and Dustin Greco. We are...",
            listData: [
                "",
            ]
        }
    ];

const AboutPage = () => {
    return (
        <section key={"about-page"} className={"mb-15"}>
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

export default AboutPage;