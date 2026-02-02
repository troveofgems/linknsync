import {
    PageKey, SectionLabel, StaticPageContent,
    printSectionWrapper
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "1. Our Services",
    INTRODUCTION_VERBIAGE = "The information provided when using the Services is not intended for distribution to or " +
        "use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law " +
        "or regulation or which would subject us to any registration requirement within such jurisdiction or country. " +
        "Accordingly, those persons who choose to access the Services from other locations do so on their own initiative " +
        "and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const OurServices = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);