import {ContactUs} from "@/app/(public-pages)/toc/sections/Contact.Us";
/*import {Waitlist} from "@clerk/nextjs";*/

const PAGE_LABEL = "Contact Us";

const
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const ContactUsPage = () => {
    return (
        <section key={pageKey} className={"mb-15 min-h-[500]"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <div className={"flex flex-col lg:flex-row w-1/2 m-auto items-center justify-center"}>
                <ContactUs pageKey={pageKey} sectionLabel={"About Us"} />
                {/*<div className={"lg:w-1/2 mt-20"}>
                    <Waitlist />
                </div>*/}
            </div>

        </section>
    );
}

export default ContactUsPage;