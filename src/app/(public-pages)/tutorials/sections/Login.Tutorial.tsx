import {VideoShell} from "@/app/(public-pages)/tutorials/video-shell/VideoShell";
import {
    PageContent,
    printSection,
    StaticPageAlignment,
    StaticPageContent
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "tutorials-login",
    label: "Login",
    verbiage: "Learn how to log into your account with this video!",
    inShort: "Shows how to login to your account the application using Clerk."
}];

const LoginTutorial = () => {
    return (
        <section key={"tutorials-page"} className={"mb-15"}>
            <div className={StaticPageAlignment}>
                {
                    pageContents.map((pageContent: PageContent) => printSection(pageContent))
                }
                <VideoShell />
            </div>
        </section>
    );
}

export default LoginTutorial;