import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-processed-information",
    label: "2. How Do We Process Your Information?",
    verbiage: "We process your personal information for a variety of reasons, depending on how you interact with our " +
        "Services, including:",
    listData: [
        "To facilitate account creation and authentication and otherwise manage user accounts. We may also process your " +
        "information so you can create and log into your account, as well as keep your account in working order.",
        "To deliver and facilitate delivery of services to the user. We may process your information to provide you " +
        "with the requested service (e.g. ICal Consolidation).",
        "To respond to user inquiries or offer support to users.",
        "To send administrative information to you. This could include a Collision Detection email between icals of " +
        "various users.",
        "To enable user-to-user communications.",
        "To evaluate and improve our Services, product, and your experience."
    ],
    inShort: "We process your information to provide, improve, and administer our Services, communicate with you, for " +
        "security and fraud prevention. We may also process your information for other purposes with your consent."
}];

export const ProcessedInformation = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);