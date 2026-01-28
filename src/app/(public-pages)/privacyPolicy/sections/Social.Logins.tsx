import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-social-logins",
    label: "5. How Do We Handle Your Social Logins?",
    verbiage: "",
    listData: [
        ""
    ],
    inShort: "If you choose to register or log in to our Services using a Social Media Account, we may have access to " +
        "certain information about you."
}];

export const SocialLogins = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);