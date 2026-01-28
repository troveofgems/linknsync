import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-dnt-controls",
    label: "10. Controls for Do-Not-Track Features?",
    paragraphs: [
        "Most web browsers and some mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate " +
        "to signal your privacy preference not to have data about your online activities monitored and collected. At this " +
        "stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, " +
        "we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your " +
        "choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future," +
        "we will inform you about that practice in a revised version of this Privacy Policy.",
        "California law requires us to let you know how we respond to web browser DNT signals. Because there is not an " +
        "industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.",
        "We do have plans to implement the DNT feature to our site in the future."
    ]
}];

export const DNTControls = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);