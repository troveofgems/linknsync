import {Beta} from "@/app/(public-pages)/roadmap/sections/Beta";
import {Version1} from "@/app/(public-pages)/roadmap/sections/Version1";
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {Version2} from "@/app/(public-pages)/roadmap/sections/Version2";

const
    PAGE_LABEL = "Our Roadmap",
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

const FutureRoadMapPage = () => {
    return (
        <section className={"futureRoadmap-section"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <h2 className={"lg:w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <Beta pageKey={pageKey} sectionLabel={"BETA"} />
            <Version1 pageKey={pageKey} sectionLabel={"Version 1"} />
            <Version2 pageKey={pageKey} sectionLabel={"Version 2"} />
            <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Questions Or Concerns"} />
        </section>
    );
}

export default FutureRoadMapPage;