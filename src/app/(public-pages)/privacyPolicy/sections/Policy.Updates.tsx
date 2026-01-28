import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-updates",
    label: "12. Do We Make Updates To This Policy?",
    verbiage: "We may update this Privacy Policy from time to time. The updated version will be indicated by " +
        "an updated 'Revised' date at the top of this Privacy Policy. " +
        "If we make material changes to this Privacy Policy, we may notify you either by prominetly posting a notice " +
        "of such changes or by directly sending you a notification. We encourage you to review this privacy policy " +
        "frequently to be informed of how we are protecting your information.",
    inShort: "Yes, we will update this policy as necessary to stay compliant with relevant laws."
}];

export const PolicyUpdates = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);