import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "3. User Representations",
    SUB_LIST = [
        {
            paragraph: "If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the " +
                "right to suspend or terminate your account and refuse any and all current or future use of the Services (" +
                "or any portion thereof).",
            desc: "By using the Services, you represent that:",
            list: [
                "You have the legal capacity and you agree to comply with these Legal Terms;",
                "You are not a minor the the jurisdiction where you reside or under the age of 18 years old;",
                "You will not access the Services through an automated or non-human means, whether through a bot, " +
                "script, ai, or otherwise;",
                "You will not use the Services for any illegal or unauthorized purpose;",
                "Your use of the Services will not violate any applicable law or regulation"
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
export const UserRepresentations = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);