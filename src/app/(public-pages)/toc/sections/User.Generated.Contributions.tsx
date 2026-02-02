import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "5. User Generated Contributions",
    SUB_LIST = [
        {
            paragraph: "We may provide you with the opportunity to create, submit, post, display, transmit, " +
                "perform, publish, distribute, or broadcast content and materials to us or on the Services, including but " +
                "not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal " +
                "information or other material (collectively 'Contributions'). Contributions may be viewable by other users " +
                "of the Services and through third-party websites.",
            desc: "When you create or make available any Contributions, you " +
                "thereby represent and warrant that:",
            list: [
                "You have the legal capacity and you agree to comply with these Legal Terms;",
            ]
        }
    ]

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    paragraphList: SUB_LIST
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const UserGeneratedContributions = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);