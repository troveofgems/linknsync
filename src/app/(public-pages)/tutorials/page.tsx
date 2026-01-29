import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {StaticPageAlignment} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    lastUpdate = new Date("1/28/2026")
        .toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }),
    PageLabel = "Tutorials";

const TutorialsPage = () => {
    return (
        <section key={"tutorials-page"} className={"mb-15"}>
            <h1 className={"lg:w-1/2 m-auto flex flex-wrap gap-3 sm:gap-x-6 text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <h2 className={StaticPageAlignment}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <QuestionsOrConcerns />
        </section>
    );
}

export default TutorialsPage;