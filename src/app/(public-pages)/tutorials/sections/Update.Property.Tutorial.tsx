import {VideoShell} from "@/app/(public-pages)/tutorials/video-shell/VideoShell";
import {
    PageContent, printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "tutorials-update-property",
    label: "Update Property",
    verbiage: "Learn how to update a property with this video!",
    inShort: "Shows how to update a property within the application."
}];

const UpdatePropertyTutorial = () => {
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

export default UpdatePropertyTutorial;