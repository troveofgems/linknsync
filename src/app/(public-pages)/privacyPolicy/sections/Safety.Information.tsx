import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-safety-information",
    label: "7. How Do We Keep Your Information Safe?",
    verbiage: "We have implemented appropriate and reasonable technical and organizational security measures designed to " +
        "protect the security of any personal information we process. However, despite our safeguards and efforts to secure " +
        "your information, no electronic transmission over the internet or information storage technology can be " +
        "guaranteed to be 100% secure, so we cannot promise to guarantee that hackers, cybercriminals, or other unauthorized " +
        "third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. " +
        "Although we will do our best to protect your personal information, transmission of personal information to " +
        "and from our services is at your own risk. you should only access the Services within a secure environment.",
    inShort: "We aim to protect your personal information through a system of organizational and technical security " +
        "measures (e.g. Data encrypted at rest in the DB)."
}];

export const SafetyInformation = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
);