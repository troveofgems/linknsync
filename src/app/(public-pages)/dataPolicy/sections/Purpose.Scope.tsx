import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "data-policy-purpose-scope",
        label: "Purpose and Scope",
        verbiage: "This policy defines how Link N' Sync collects, processes, stores, and disposes of data related " +
            "to its vacation‑rental platform. It applies to all employees, contractors, and third‑party vendors " +
            "handling data in the United States and Mexico.",
        inShort: "",
        listData: [
            "Covers User Data, Organization Data, Property Data, PMS Data, and ICAL Data.",
            "Applies to production, staging, and development environments."
        ]
    }
];

export const PurposeScope = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);
