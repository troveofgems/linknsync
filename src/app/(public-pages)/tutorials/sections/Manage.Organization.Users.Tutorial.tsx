import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

import lnsPoster from '@/public/videos/lns-poster.mp4.json';
import type {Asset} from "../../../../../node_modules/next-video/dist/assets.d.ts";

const
    HEADER = "User Types",
    IN_SHORT = "Learn about PLA|ALA|RLA Roles for your organization within the application.",
    INTRODUCTION_VERBIAGE =  "Learn about Org User Types for your organization within the application.";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT,
    video: lnsPoster as unknown as Asset,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const ManageOrganizationalUsersTutorial = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);

export default ManageOrganizationalUsersTutorial;