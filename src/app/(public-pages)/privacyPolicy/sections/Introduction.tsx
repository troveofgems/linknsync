import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
        key: "privacy-policy-intro",
        label: "Introduction",
        verbiage: "This Privacy Policy for Link-N-Sync ('we', 'us', 'our'), describes how and why we might access, " +
            "collect, store, use, and/or share ('process') your personal information when you use our services " +
            "('Services'), including when you:",
        listData: [
            `Visit our website at https://www.linknsync.app or any website of ours that links to this privacy policy`,
            "Use Link-N-Sync Service. A platform that manages ical data for small to medium sized Short Term Vacation " +
            "Rental Teams. Icals between users of the same team are consolidated and bashed to detect collisions " +
            "between bookings and the team.",
            "Engage with us in other related ways, including marketing or events"
        ],

    }];

export const Introduction = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        {
            pageContents.map((pageContent: PageContent) => printSection(pageContent))
        }
    </div>
)