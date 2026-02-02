import {ContactUs} from "@/app/(public-pages)/toc/sections/Contact.Us";

const PAGE_LABEL = "Contact Us";

const
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const ContactUsPage = () => {
    return (
        <section key={pageKey} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <ContactUs pageKey={pageKey} sectionLabel={"About Us"} />
        </section>
    );
}

export default ContactUsPage;