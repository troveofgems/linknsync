import {FrontEnd} from "@/app/(public-pages)/techStack/sections/Front.End";
import {BackEnd} from "@/app/(public-pages)/techStack/sections/Back.End";
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
    PageLabel = "Technology Stack";

const TechStackPage = () => {

    return (
        <section key={"tech-stack-page"} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <h2 className={StaticPageAlignment}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <FrontEnd />
            <BackEnd />
            <QuestionsOrConcerns />
        </section>
    );
}

export default TechStackPage;