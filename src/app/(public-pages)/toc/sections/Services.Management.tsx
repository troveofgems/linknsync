import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "7. Services Management",
    SUB_LIST = [
        {
            paragraph: "",
            desc: "We reserve the right, but not the obligation, to: ",
            list: [
                "Monitor the Services for violations of these Legal Terms;",
                "Take appropriate legal action against anyone who, in our sole discretion, violates " +
                "the law or these Legal Terms, including without limitation, reporting such users to law enforcement " +
                "authorities;",
                "In our sole discretion, violates and without limitation, refuse, restrict access to, limit the availability of, " +
                "or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;",
                "In our sole discretion and without limitation, notice, or liability, to remove from the Services " +
                "or otherwise disable all files and content that are excessive in size or are in anyway burdensome to " +
                "our systems;",
                "Otherwise manage the Services in a manner designed to protect our rights and property and facilitate " +
                "the property functioning of the Services."
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
    paragraphList: SUB_LIST,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const ServicesManagement = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);