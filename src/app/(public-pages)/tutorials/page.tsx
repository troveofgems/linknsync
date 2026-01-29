import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {StaticPageAlignment} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";
import LoginTutorial from "@/app/(public-pages)/tutorials/sections/Login.Tutorial";
import CreatePropertyTutorial from "@/app/(public-pages)/tutorials/sections/Create.Property.Tutorial";
import CreateOrganizationTutorial from "@/app/(public-pages)/tutorials/sections/Create.Organization.Tutorial";
import ManageOrganizationalUsersTutorial
    from "@/app/(public-pages)/tutorials/sections/Manage.Organization.Users.Tutorial";

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
            <div className={"flex flex-col lg:flex-row lg:flex-wrap"}>
                <LoginTutorial />
                <CreateOrganizationTutorial />
                <ManageOrganizationalUsersTutorial />
                <CreatePropertyTutorial />
            </div>

            <QuestionsOrConcerns/>
        </section>
    );
}

export default TutorialsPage;