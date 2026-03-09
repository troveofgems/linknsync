import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Table of Contents",
    TOC = [
        "1. What Information Do We Collect?",
        "2. How Do We Process Your Information?",
        "3. When and With Whom Do We Share Your Personal Information?",
        "4. Do We Use Cookies and Other Tracking Technologies?",
        "5. How Do We Handle Social Logins?",
        "6. How Long Do We Keep Your Information?",
        "7. How Do We Keep Your Information Safe?",
        "8. Do We Collect Information From Minors?",
        "9. What Are Your Privacy Rights?",
        "10. Controls For Do-Not-Track Features",
        "11. Do United States Residents Have Specific Privacy Rights?",
        "12. Do We Make Updates To This Policy?",
        "13. How Can You Contact Us About This Policy",
        "14. How Can You Review, Update, or Delete the Data We Collect From You?",
    ];

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    TOC,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const TableOfContents = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);
