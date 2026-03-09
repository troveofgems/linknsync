import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "Manage ICals",
    IN_SHORT = "Learn how to manage your icals with this video!",
    INTRODUCTION_VERBIAGE =  "Shows how to manage icals within the application.";

import lnsPoster from '@/public/videos/lns-poster.mp4.json';
import type {Asset} from "../../../../../node_modules/next-video/dist/assets.d.ts";

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
export const ManageICalsTutorial = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);

export default ManageICalsTutorial;