import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

import loginTutorial from '@/public/videos/login-tutorial.mp4.json';
import type {Asset} from "../../../../../node_modules/next-video/dist/assets.d.ts";

const
    HEADER = "Login & Profile",
    IN_SHORT = "Shows how to log into your account and view your profile within the application using Clerk.",
    INTRODUCTION_VERBIAGE =  "Learn how to log into your account with this video!";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT,
    video: loginTutorial as unknown as Asset
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const LoginAndProfileTutorial = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);

export default LoginAndProfileTutorial;