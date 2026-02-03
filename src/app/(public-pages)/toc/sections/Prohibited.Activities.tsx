import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const
    HEADER = "4. Prohibited Activities",
    INTRO_VERBIAGE = "You may not access or use the Services for any purpose other than that for which we make " +
        "the Services available. The Services may not be used in connection with any commercial endeavors except those that " +
        "are specifically endorsed or approved by us.",
    SUB_LIST = [
        {
            paragraph: "As a user of the Services, you agree not to:",
            desc: "",
            list: [
                "Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, " +
                "a collection, compilation, database, or directory without written permission by us.",
                "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information " +
                "such as user passwords.",
                "Circumvent, disable, or otherwise interfere with security-related features of the Services, including " +
                "features that prevent or restrict the use of copying any Content or enforce limitations on the use of the Services and/or Content contained therein.",
                "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.",
                "Use any information obtained from the Services to harass, abuse, or harm another person.",
                "Make improper use of our support services or submit false reports of abuse or misconduct.",
                "Use the Services in a manner inconsistent with any applicable laws or regulations.",
                "Engage in unauthorized framing or linking to the Services.",
                "Upload or transmit (or attempt to upload or transmit), viruses, trojan horses, or other malignant material, " +
                "including the excessive use of capital letters and spamming (continuous posting of repetitive text), that " +
                "interferes with any party's uninterrupted use and enjoyment of the Services, or modifies, impairs, disrupts, " +
                "alters, or interferes with the use, features, functions, operation, or maintenance of the Services.",
                "Engage in any automated use of the system, such as using scripts to send comments or messages, or using " +
                "any data mining tools or robots, or similar data gathering and extraction tools.",
                "Delete the copyright or other proprietary rights notice from any Content",
                "Attempt to impersonate another user or person or use the username of another user.",
                "Upload or transmit (or attempt to upload or transmit) any material that acts as a passive or active information " +
                "collection or transmission mechanism, including without limitation, clear graphics interchange formats (gifs), " +
                "1x1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as 'spyware' or ' " +
                "passive collection mechanisms' or 'pcms').",
                "Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected " +
                "to the Services.",
                "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.",
                "Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, any portion of the Services, " +
                "or any protected app pages.",
                "Copy or adapt the Service's software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.",
                "Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software " +
                "comprising or in any way making up a part of the services.",
                "Except as may be the result of standard search engine or internet browser usage, use, launch, develop, " +
                "or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or " +
                "offline reader that accesses the Services, or use or launch any unauthorized script or other software.",
                "Use a buying agent or purchasing agent to make purchases on the Services.",
                "Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by " +
                "electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under " +
                "false pretenses.",
                "Use of the Services as part of any effort to compete with us or otherise use the Services and/or the Content " +
                "for any revenue-generating endeavor or commercial enterprise."
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
    verbiage: INTRO_VERBIAGE,
    paragraphList: SUB_LIST,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const ProhibitedActivities = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);