import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

import lnsPoster from '@/public/videos/lns-poster.mp4.json';
import type {Asset} from "../../../../../node_modules/next-video/dist/assets.d.ts";

const
    HEADER = "Create Property",
    IN_SHORT = "Learn how to create a property with this video!",
    INTRODUCTION_VERBIAGE =  "Shows how to create a property within the application.";

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    verbiage: INTRODUCTION_VERBIAGE,
    inShort: IN_SHORT,
    video: lnsPoster as unknown as Asset
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const CreatePropertyTutorial = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);

export default CreatePropertyTutorial;