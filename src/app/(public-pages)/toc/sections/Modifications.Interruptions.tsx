import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "9. Modifications and Interruptions",
    INTRO_VERBIAGE = "We reserve the right to change, modify, or remove the contents of the Services at any time for any " +
        "reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. " +
        "We will not be liable to you or any third party for any modification, price change, suspension, or " +
        "discontinuance of the Services.",
    MAIN_LIST = [
        "We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other" +
        "miscellaneous technical problems or need to perform maintenance related to the Services, resulting in interruptions " +
        ", delays or errors. We reserve the right to change, revise, update, discontinue, or otherwise modify the Services " +
        "at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, " +
        "damage, or inconvenience caused by your inability ot access or use the Services during any downtime or discontinuance " +
        "of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or" +
        " to supply any corrections, updates, or releases in connection therewith."
    ]

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRO_VERBIAGE,
    paragraphs: MAIN_LIST,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const ModificationInterruptions = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);