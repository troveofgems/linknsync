import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "15. Indemnification",
    SUB_LIST = [
        {
            paragraph: "You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our " +
                "respective agents, partners, and employees, form and against any loss, damage, liability, claim, or demand, " +
                "including any  reasonable attorneys' fees and expenses, made by any third party due to or arising out of: ",
            desc: "Notwithstanding, we reserve the right, at your expense, to assume the exclusive defense and control of any matter " +
                "for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such " +
                "claims. We will use reasonable efforts to notify  you of any such claim, action, or proceeding which is " +
                "subject to this indemnification upon becoming aware of it.",
            list: [
                "Use of the Services;",
                "Breach of these Legal Terms;",
                "Any breach of your representations and warranties set forth in these Legal Terms;",
                "Your violation of the rights of a third party, including but not limited to intellectual property rights;",
                "Or any overt harmful act toward any other user of the Services with whom you connected via the Services",
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
export const Indemnification = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);