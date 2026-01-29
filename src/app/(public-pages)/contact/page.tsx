import {
    StaticPageContent,
    PageContent,
    printSection,
    StaticPageAlignment
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

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
        <section key={"about-page"} className={"min-h-[35rem] mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <div className={StaticPageAlignment}>
                {
                    pageContents.map((pageContent: PageContent) => printSection(pageContent))
                }
            </div>
        </section>
    );
}

export default ContactPage;