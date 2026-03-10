import {FrontEnd} from "@/app/(public-pages)/techStack/sections/Front.End";
import {BackEnd} from "@/app/(public-pages)/techStack/sections/Back.End";
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {StaticPageAlignment} from "@/utils/static.page.content.utils";
import {LAST_UPDATE__TECH_STACK} from "@/constants/static.page.history.constants";

const PAGE_LABEL = "Technology Stack";

const
    lastUpdate = new Date(LAST_UPDATE__TECH_STACK)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const TechStackPage = () => (
    <section key={pageKey} className={"mb-15"}>
        <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
            {pageLabel}
        </h1>
        <h2 className={StaticPageAlignment}>
            <span className={"font-bold"}>Last Revised</span> {lastUpdate}
        </h2>
        <FrontEnd pageKey={pageKey} sectionLabel={"Front End"} />
        <BackEnd pageKey={pageKey} sectionLabel={"Back End"} />
        <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Questions or Concerns"} />
    </section>
);

export default TechStackPage;