import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "17. Electronic Communications, Transactions, and Signatures",
    INTRO_VERBIAGE = "Visiting the Services, sending us emails, and completing online forms constitute electronic " +
        "communications. You consent to receive electronic communications, and you agree that all agreements, notices, " +
        "disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy " +
        "any legal requirement that such communication be in writing.",
    MAIN_LIST = [
        "YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO " +
        "ELECTRONIC DELIVERY OF SUCH NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR " +
        "VIA THE SERVICES.",
        "You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws " +
        "in any jurisdiction which require an original signature or delivery or retention of non-electronic records, " +
        "or to payments or the granting of credits by any means other than electronic means."
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
export const ElectronicCommunications = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);