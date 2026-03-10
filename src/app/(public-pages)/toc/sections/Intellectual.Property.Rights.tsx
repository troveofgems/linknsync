import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "2. Intellectual Property Rights",
    MAIN_LIST = [
        "We are the owner of the licensee of all intellectual property rights in our Services, including all source code, " +
        "databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services " +
        "(collectively, the 'Content'), as well as trademarks, service marks, and logos contained therein (the 'Marks').",
        "Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights " +
        "and unfair competition laws) and treaties around the world.",
        "The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use or " +
        "internal business purpose only."
    ]

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    paragraphs: MAIN_LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const IntellectualPropertyRights = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);