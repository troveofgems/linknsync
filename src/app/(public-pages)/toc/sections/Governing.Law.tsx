import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "10. Governing Law",
    MAIN_LIST = [
        "These Legal Terms shall be governed by and defined following standardized laws.",
        "You yourself irrevocably consent that the courts of Arizona shall have exclusive jurisdiction to " +
        "resolve any dispute which may arise in connection with these Legal Terms."
    ]

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    paragraphs: MAIN_LIST,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const GoverningLaw = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);