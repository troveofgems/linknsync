import {
    PageKey, SectionLabel, StaticPageContent,
    printSectionWrapper
} from "@/utils/static.page.content.utils";

const
    HEADER = "Table of Contents",
    TOC = [
        "1. Our Services",
        "2. Intellectual Property Rights",
        "3. User Representations",
        "4. Prohibited Activities",
        "5. User Generated Contributions",
        "6. Contribution License",
        "7. Services Management",
        "8. Term and Termination",
        "9. Modifications and Interruptions",
        "10. Governing Law",
        "11. Dispute Resolution",
        "12. Corrections",
        "13. Disclaimer",
        "14. Limitations of Liability",
        "15. Indemnification",
        "16. User Data",
        "17. Electronic Communications, Transactions, and Signatures",
        "18. Miscellaneous",
        "19. Contact Us",
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    TOC
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const TableOfContents = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);