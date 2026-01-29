import {StaticPageContent, PageContent, printSection} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    PageLabel = "Contact Us",
    pageContents: StaticPageContent = [
        {
            key: "contact-us",
            label: "Get In Touch!",
            verbiage: "Questions, concerns, or just want to get in touch? Send us an email at: ",
            showContact: true
        }
    ];

const ContactPage = () => {
    return (
        <section key={"about-page"} className={"min-h-[40rem] mb-15"}>
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

export default ContactPage;