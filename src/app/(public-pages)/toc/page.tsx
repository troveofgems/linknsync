import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {Introduction} from "@/app/(public-pages)/toc/sections/Introduction";
import {TableOfContents} from "@/app/(public-pages)/toc/sections/Table.Of.Contents";
import {ContactUs} from "@/app/(public-pages)/toc/sections/Contact.Us";

const
    PAGE_LABEL = "Terms and Conditions",
    LAST_UPDATE = "1/28/2026";
const
    lastUpdate = new Date(LAST_UPDATE)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

function ToCPage() {
    return (
        <section className={"toc-section"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <h2 className={"lg:w-1/2 lg:m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <Introduction pageKey={pageKey} sectionLabel={"Introduction"} />
            <TableOfContents pageKey={pageKey} sectionLabel={"Table of Contents"} />
            <ContactUs pageKey={pageKey} sectionLabel={"Contact Us"} />
            <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Questions Or Concerns"} />
        </section>
    );
}

export default ToCPage;