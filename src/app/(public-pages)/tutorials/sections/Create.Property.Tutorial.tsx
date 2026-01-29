import {VideoShell} from "@/app/(public-pages)/tutorials/video-shell/VideoShell";
import {
    PageContent, printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "tutorials-create-property",
    label: "Create Property",
    verbiage: "Learn how to create a property with this video!",
    inShort: "Shows how to create a property within the application."
}];

const CreatePropertyTutorial = () => {
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

export default CreatePropertyTutorial;