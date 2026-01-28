import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-safety-minors",
    label: "8. Do We Collect Information From Minors?",
    verbiage: "We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we " +
        "sell such or your personal information. By using the Services, you represent that you are at least 18 or that " +
        "you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. " +
        "If we learn that personal information from users less than 18 years of age has been collected, we will " +
        "deactivate the account and take reasonable measures to promptly purge and delete such data from our systems and" +
        " records. If you become aware of any data we may have collected from children or persons under the age of 18, " +
        "please contact us at: ",
    inShort: "We do not knowingly collect data from or market to children or people under 18 years of age."
}];

export const SafetyMinors = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);