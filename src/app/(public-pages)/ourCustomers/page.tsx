import {StaticPageContent, PageContent, printSection} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    PageLabel = "Short-Term Vacation Rental Property Managers",
    pageContents: StaticPageContent = [
        {
            key: "Primary Listing Agents",
            label: "Primary Listing Agents",
            verbiage: "The following Frontend Technologies are leveraged by Link-N-Sync",
            listData: [
                "",
            ]
        },
        {
            key: "Secondary Listing Agents",
            label: "Secondary Listing Agents",
            verbiage: "The following Backend Technologies are leveraged by Link-N-Sync",
            listData: [
                "",
            ]
        },
        {
            key: "Referral Listing Agents",
            label: "Referral Listing Agents",
            verbiage: "",
            listData: [
                "",
            ]
        }
    ];

const AboutPage = () => {
    return (
        <section key={"our-customers-page"} className={"mb-15"}>
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