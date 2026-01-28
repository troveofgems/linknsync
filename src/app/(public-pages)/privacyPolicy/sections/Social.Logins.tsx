import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-social-logins",
    label: "5. How Do We Handle Your Social Logins?",
    paragraphs: [
        "Our Services offer you the ability to register and log in using a third party tool called Clerk. Where you choose " +
        "to do this, we will receive certain profile information about you from your social media provider. This profile " +
        "information we receive may vary depending on the social media provider concerned, but will often include your " +
        "name, email address, possibly your friend list, and profile picture, as well as other information that you " +
        "choose to make public on such a social media platform.",
        "We will use the information we receive only for the purposes that are described in this Privacy Policy or that " +
        "are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not " +
        "responsible for, other uses of your personal information by your third-party social media provider. We reccommend " +
        "that you review their privacy policies or notices to understand how they collect, use and share your personal " +
        "information, and how you can set your privacy preferences on their sites and apps."
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