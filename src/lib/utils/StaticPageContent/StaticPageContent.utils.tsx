import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import BrettAndDustin from "@/public/images/brettanddustin.jpg";
import {VideoShell} from "@/app/(public-pages)/tutorials/video-shell/VideoShell";
import type {Asset} from "../../../../node_modules/next-video/dist/assets.d.ts";

const CONTACT_US_EMAIL = "linknsyncdev@gmail.com";

// Typed Exports
export type PageKey = string;
export type SectionLabel = string;
export type PageContent = {
    key: PageKey;
    label?: string;
    sectionLabel?: string;
    verbiage?: string;
    list?: string[];
    listData?: string[];
    inShort?: string;
    paragraphs?: string[];
    paragraphList?: { paragraph: string; desc: string; list: string[]; printTable?: boolean; }[];
    TOC?: string[];
    showContact?: boolean;
    contactEmail?: string;
    contactPhone?: string;
    contactAddress?: {
        street_1: string;
        street_2: string;
        street_3: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    contactSubject?: string;
    showQuestionsOrConcerns?: boolean;
    showCreators?: boolean;
    video?: Asset;
};
export type StaticPageContent = PageContent[];

// Internal Types
type SimpleList = string[];
type TOCSection = {
    pageKey: PageKey;
    sectionLabel: string;
    TOC?: string[];
};
type IntroSection = {
    pageKey: PageKey;
    sectionLabel: string;
    verbiage?: string;
};
type InShortSection = {
    pageKey: PageKey;
    sectionLabel: string;
    inShort: string;
};
type SimpleParagraphSection = {
    pageKey: PageKey;
    sectionLabel: string;
    paragraphs?: string[];
};
type SimpleListSection = {
    pageKey: PageKey;
    sectionLabel: string;
    list: SimpleList;
}
type ParagraphWithListSection = {
    pageKey: PageKey;
    sectionLabel: string;
    paragraphWithList?: {
        paragraph?: string;
        desc?: string;
        list?: string[];
    }[];
};
type ContactUsSection = {
    pageKey: PageKey;
    sectionLabel: string;
    contactEmail: string;
    contactPhone?: string;
    contactAddress?: {
        street_1: string;
        street_2: string;
        street_3: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    subject?: string;
};
type QuestionsOrConcernsSection = {
    pageKey: PageKey;
    sectionLabel: string;
    contactEmail: string;
    subject?: string;
}
type VideoSection = {
    pageKey: PageKey;
    sectionLabel: string;
    video: Asset;
}

// Exported or Utilized Constants
export const StaticPageAlignment = "flex flex-col lg:w-1/2 lg:m-auto";
export const H2_CLASSES = "flex flex-wrap gap-2 sm:gap-x-6 items-center justify-start text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10";

// Section Helper Methods
const _InShort = ({pageKey, sectionLabel, inShort}: InShortSection) => (
    <div key={`${pageKey}-${sectionLabel}-in-short`} className={"my-3"}>
        <b>
            <em>In Short:</em>
        </b> <span className={"text-muted-foreground"}>{inShort}</span>
    </div>
);

const _SectionIntroVerbiage = ({pageKey, sectionLabel, verbiage}: IntroSection) => (
    <p key={`p-intro-${pageKey}-${sectionLabel}`} className={"mt-3 leading-8 mx-auto"}>
        {verbiage ?? ""}
    </p>
);

const _SectionSimpleParagraph = ({pageKey, sectionLabel, paragraphs}: SimpleParagraphSection) => (
    <>
        {paragraphs?.map((item, i) => (
            <p className={"mt-3  leading-8 mx-auto"} key={`${pageKey}-${sectionLabel}-${i}`}>
                {item}
            </p>
        ))}
    </>
);

const _SectionParagraphWithList = ({pageKey, sectionLabel, paragraphWithList}: ParagraphWithListSection) => (
    <div key={`${pageKey}-${sectionLabel}-`}>
        {paragraphWithList?.map((paragraphData, index) => (
            <div key={`${pageKey}-p-div-` + index} className={"my-8"}>
                <p className={"mt-3 leading-8 mx-auto"} key={`${pageKey}-p-` + index}>
                    <b>{paragraphData.paragraph}</b>
                </p>
                <em className={"m-0 p-0"}>
                    <small className={"mt-3 mx-auto"} key={`${pageKey}-p-desc-` + index}>
                        {paragraphData.desc}
                    </small>
                </em>
                <ul className={"mt-4 list-disc"}>
                    {paragraphData?.list?.map((listData, index) => (
                        <li key={`${pageKey}-paragraph-${index}`} className={"my-2 mx-10"}>{listData}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

const _TOC = ({pageKey, sectionLabel, TOC}: TOCSection) => (
    <ol key={`${pageKey}-${sectionLabel}`}>
        {
            !!TOC &&
            TOC.length > 0 && (
                TOC.map((item, i) => (
                    <li
                        key={`${pageKey}-${sectionLabel}-${i}`}
                        className={"link"}
                    >
                        <Link href={""}>
                            {item}
                        </Link>
                    </li>
                ))
            )
        }
    </ol>
)

const _List = ({pageKey, sectionLabel, list}: SimpleListSection) => (
    <ul key={`${pageKey}-${sectionLabel}`} className={"mt-3 leading-8 list-disc"}>
        {
            !!list &&
            list.length > 0 && (
                list.map((item, i) => (
                    <li
                        className={"my-2 mx-10"}
                        key={`${pageKey}-${sectionLabel}-${item.toLowerCase()}-${i}`}>
                        {item}
                    </li>
                ))
            )
        }
    </ul>
)

const _Creators = ({pageKey, sectionLabel}: IntroSection) => (
    <Card key={`${pageKey}-${sectionLabel}`} className={"w-fit m-auto mt-5"}>
        <CardContent className={"w m-auto"}>
            <PictureWrapper
                staticImage={BrettAndDustin}
                classNames={" h-[32rem] rounded-md object-cover flex items-center"}
                isSplashImg={true}
            />
        </CardContent>
    </Card>
)

const _ContactUs = ({pageKey, contactEmail, sectionLabel, subject}: ContactUsSection) => (
    <div key={`${pageKey}-${sectionLabel}`} className={"mt-3"}>
        <Link href={`mailto:${contactEmail ?? CONTACT_US_EMAIL}?subject=${subject}`} className={"staticPageLink"}>{CONTACT_US_EMAIL}</Link>
    </div>
);

const _QuestionsOrConcerns = ({ pageKey, sectionLabel, contactEmail, subject }: QuestionsOrConcernsSection) => (
    <div key={`${pageKey}-${sectionLabel}`} className={"my-4"}>
        <div className={"flex flex-col"}>
            <span className={"font-bold"}>
                Questions or concerns?
            </span>
            <p className={"leading-8"}>
                Reading this section will help you understand your rights and choices. We are responsible for
                making decisions about how your personal information is processed. If you do not agree with our policies and
                practices please do not use our Services. If you still have any questions or concerns please contact us at <a href={`mailto:${contactEmail}?subject=${subject}`} className={"staticPageLink"}>{contactEmail}</a>
            </p>
        </div>
    </div>
);

const _RenderVideo = ({ pageKey, sectionLabel, video }: VideoSection) => (
    <VideoShell pageKey={pageKey} sectionLabel={sectionLabel} src={video} />
);

export const printSectionWrapper = (pageContents: StaticPageContent) => (
    <div className={StaticPageAlignment}>
        {
            pageContents.map((pageContent: PageContent) => _printSection(pageContent))
        }
    </div>
);

export const _printSection = (
    {
        key, label, verbiage, list,
        inShort, paragraphs,
        showContact, paragraphList, sectionLabel,
        TOC, contactEmail, contactPhone, contactAddress,
        showQuestionsOrConcerns, contactSubject, showCreators,
        video
    }: PageContent
) => (
    <div key={key}>
        <h2 className={H2_CLASSES}>{label}</h2>
        {
            !!inShort &&
            inShort.length > 0 && (
                _InShort({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    inShort
                })
            )
        }
        {
            !!verbiage &&
            verbiage.length > 0 && (
                _SectionIntroVerbiage({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    verbiage
                })
            )
        }
        {
            !!showCreators &&
            showCreators && (
                _Creators({
                    pageKey: key,
                    sectionLabel: sectionLabel as string
                })
            )
        }
        {
            !!list &&
            list.length > 0 && (
                _List({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    list
                })
            )
        }
        {
            !!TOC &&
            TOC.length > 0 && (
                _TOC({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    TOC
                })
            )
        }
        {
            !!paragraphs &&
            paragraphs.length > 0 && (
                _SectionSimpleParagraph({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    paragraphs: paragraphs as string[]
                })
            )
        }
        {
            !!paragraphList &&
            paragraphList.length > 0 && (
                _SectionParagraphWithList({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    paragraphWithList: paragraphList
                })
            )
        }
        {
            !!showContact &&
            showContact && (
                _ContactUs({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    contactEmail: contactEmail as string,
                    subject: contactSubject as string,
                    contactPhone,
                    contactAddress,
                })
            )
        }
        {
            !!showQuestionsOrConcerns &&
            showQuestionsOrConcerns && (
                _QuestionsOrConcerns({
                    pageKey: key,
                    sectionLabel: sectionLabel as string,
                    contactEmail: contactEmail as string,
                    subject: contactSubject as string
                })
            )
        }
        {
            !!video && (
                _RenderVideo({ pageKey: key, sectionLabel: sectionLabel as string, video: video})
            )
        }
    </div>
);