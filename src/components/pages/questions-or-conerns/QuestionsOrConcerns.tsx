import {
    PageKey, SectionLabel, StaticPageContent,
    printSectionWrapper
} from "@/utils/static.page.content.utils";

const CONTACT_EMAIL = "linknsyncdev@gmail.com";
//const CONTACT_EMAIL_QandA = "linknsyncdev@gmail.com";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    showQuestionsOrConcerns: true,
    contactEmail: CONTACT_EMAIL,
    contactSubject: sectionLabel,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const QuestionsOrConcerns = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);