import {VideoShell} from "@/app/(public-pages)/tutorials/video-shell/VideoShell";
import {
    PageContent, printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "tutorials-create-property",
    label: "Manage Org Users",
    verbiage: "Learn how to manage your users with this video!",
    inShort: "Shows how to manage users within the application."
}];

const ManageOrganizationalUsersTutorial = () => {
    return (
        <section key={"tutorials-page-create-property"} className={"mb-15"}>
            <div className={StaticPageAlignment}>
                {
                    pageContents.map((pageContent: PageContent) => printSection(pageContent))
                }
                <VideoShell />
            </div>
        </section>
    );
}

export default ManageOrganizationalUsersTutorial;