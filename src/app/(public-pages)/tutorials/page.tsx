import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {StaticPageAlignment} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";
import LoginAndProfileTutorial from "@/app/(public-pages)/tutorials/sections/Login.And.Profile.Tutorial";
import CreatePropertyTutorial from "@/app/(public-pages)/tutorials/sections/Create.Property.Tutorial";
import OrganizationTutorial from "@/app/(public-pages)/tutorials/sections/Organization.Tutorial";
import ManageOrganizationalUsersTutorial
    from "@/app/(public-pages)/tutorials/sections/Manage.Organization.Users.Tutorial";
import DeletePropertyTutorial from "@/app/(public-pages)/tutorials/sections/Delete.Property.Tutorial";
import UpdatePropertyTutorial from "@/app/(public-pages)/tutorials/sections/Update.Property.Tutorial";
import ManageICalsTutorial from "@/app/(public-pages)/tutorials/sections/Manage.ICal.Uploads.Tutorial";
import LogsTutorial from "@/app/(public-pages)/tutorials/sections/Logs.Tutorial";
import {LAST_UPDATE__TUTORIALS} from "@/constants/Static.Page.History.Constants";

const PAGE_LABEL = "Tutorials";

const
    lastUpdate = new Date(LAST_UPDATE__TUTORIALS)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const TutorialsPage = () => {
    return (
        <section key={pageKey} className={"mb-15"}>
            <h1 className={"lg:w-1/2 m-auto flex flex-wrap gap-3 sm:gap-x-6 text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {pageLabel}
            </h1>
            <h2 className={StaticPageAlignment}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <div key={`${pageKey}-video-list`} className={"grid grid-cols-1 lg:grid-cols-2 lg:w-2/3 lg:m-auto gap-4"}>
                <LoginAndProfileTutorial pageKey={"tutorials"} sectionLabel={"Login and Profile Video"} />
                <OrganizationTutorial pageKey={"tutorials"} sectionLabel={"Create And Manage Organization"} />
                <ManageOrganizationalUsersTutorial pageKey={"tutorials"} sectionLabel={"Manage Organization Users"} />
                <CreatePropertyTutorial pageKey={"tutorials"} sectionLabel={"Manage Organization Users"} />
                <ManageICalsTutorial pageKey={"tutorials"} sectionLabel={"Manage ICals"} />
                <UpdatePropertyTutorial pageKey={"tutorials"} sectionLabel={"Update Property"} />
                <LogsTutorial pageKey={"tutorials"} sectionLabel={"Logs"} />
                <DeletePropertyTutorial pageKey={"tutorials"} sectionLabel={"Delete Property"} />
            </div>
            <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Tutorials Questions Or Concerns"} />
        </section>
    );
}

export default TutorialsPage;