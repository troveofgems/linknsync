import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "6. Contribution License",
    MAIN_LIST = [
        "You agree that we may access, store, process, and use any information and personal data that you provide and your choices (including settings).",
        "By submitting suggestions or other feedback regarding Services, you agree that we can use and share such feedback for any purpose without compensation to you.",
        "We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual " +
        "property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations " +
        "in your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any " +
        "legal action against us regarding your Contributions."
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
export const ContributionLicense = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);