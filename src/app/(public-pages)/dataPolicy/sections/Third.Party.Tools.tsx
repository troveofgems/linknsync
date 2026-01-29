import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [
    {
        key: "data-policy-third-party-tools",
        label: "What Third Party Tools Does This Application Use?",
        verbiage: "Link N' Sync relies on several external services.",
        listData: [
            "ImitateEmail – Email transmission only, no storage of PII.",
            "ImageBB – Stores only image binaries; URLs are not PII.",
            "ClerkJS – Handles authentication.",
            "Supabase (PostgreSQL) – Primary data store; encrypted at rest.",
            "Vercel – Hosts the web UI; no data persistence."
        ]
    }
];

export const ThirdPartyTools = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);
