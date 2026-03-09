import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "8. Do We Collect Information From Minors?",
    IN_SHORT = "We do not knowingly collect data from or market to children or people under 18 years of age.",
    INTRODUCTION_VERBIAGE =  "We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we " +
        "sell such or your personal information. By using the Services, you represent that you are at least 18 or that " +
        "you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. " +
        "If we learn that personal information from users less than 18 years of age has been collected, we will " +
        "deactivate the account and take reasonable measures to promptly purge and delete such data from our systems and" +
        " records. If you become aware of any data we may have collected from children or persons under the age of 18, " +
        "please contact us at: ";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const SafetyMinors = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);