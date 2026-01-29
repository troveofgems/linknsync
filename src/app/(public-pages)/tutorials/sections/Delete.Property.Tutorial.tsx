import {VideoShell} from "@/app/(public-pages)/tutorials/video-shell/VideoShell";
import {
    PageContent, printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "tutorials-delete-property",
    label: "Delete Property",
    verbiage: "Learn how to delete a property with this video!",
    inShort: "Shows how to delete a property within the application."
}];

const DeletePropertyTutorial = () => {
    return (
        <section key={"tutorials-page-create-property"} className={"lg:w-2/3 lg:m-auto"}>
            <div className={StaticPageAlignment}>
                {
                    pageContents.map((pageContent: PageContent) => printSection(pageContent))
                }
                <VideoShell />
            </div>
        </section>
    );
}

export default DeletePropertyTutorial;