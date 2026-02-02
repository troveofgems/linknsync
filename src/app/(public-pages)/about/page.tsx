import {AboutUs} from "@/app/(public-pages)/about/sections/About.Us";

const PAGE_LABEL = "About Us";

const
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const AboutPage = () => {
    return (
        <section key={pageKey} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <AboutUs pageKey={pageKey} sectionLabel={"About Us"} />
        </section>
    );
}

export default AboutPage;