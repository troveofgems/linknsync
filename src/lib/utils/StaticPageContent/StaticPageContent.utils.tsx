import Link from "next/link";

export type PageContent = {
    key: string;
    label: string;
    verbiage?: string;
    listData?: string[];
    inShort?: string;
    paragraphs?: string[];
    paragraphList?: { paragraph: string; desc: string; list: string[]; printTable?: boolean; }[];
    showContact?: boolean;
}
export type StaticPageContent = PageContent[];

export const printSection = ({ key, label, verbiage, listData, inShort, paragraphs, showContact, paragraphList }: PageContent) => (
    <div key={key}>
        <h2
            className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-start text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10"}
        >
            {label}
        </h2>
        {
            !!inShort && (
                <div key={`${key}-in-short`} className={"my-3"}>
                    <b>
                        <em>In Short:</em>
                    </b> <span className={"text-muted-foreground"}>{inShort}</span>
                </div>
            )
        }
        <p className={"mt-3  leading-8 mx-auto"}>
            {verbiage ?? ""}
        </p>
        {
            !!listData && (
                <ul className={"mt-3 leading-8 list-disc"}>
                    {
                        listData.map((item, index) => (
                            <li
                                className={"my-2 mx-10"}
                                key={`${key}-${index}`}>
                                {item}
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            !!paragraphList && (
                <>
                    {paragraphList.map((paragraphData, index) => (
                        <div key={`${key}-paragraph-div-` + index} className={"my-8"}>
                            <p className={"mt-3 leading-8 mx-auto"} key={`${key}-paragraph-` + index}>
                                <b>{paragraphData.paragraph}</b>
                            </p>
                            <em className={"m-0 p-0"}>
                                <small className={"mt-3 mx-auto"} key={`${key}-paragraph-desc-` + index}>
                                    {paragraphData.desc}
                                </small>
                            </em>
                            <ul className={"mt-4 list-disc"}>
                                {paragraphData.list.map((listData, index) => (
                                    <li key={`${key}-paragraph-${index}`} className={"my-2 mx-10"}>{listData}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            )
        }
        {
            !!paragraphs && (
                <>
                    {paragraphs.map((paragraph, index) => (
                        <p className={"mt-3  leading-8 mx-auto"} key={`${key}-paragraph-` + index}>
                            {paragraph}
                        </p>
                    ))}
                </>
            )
        }
        {
            !!showContact && (
                <div className={"mt-3"}>
                    <Link href="mailto:linknsyncdev@gmail.com" className={"staticPageLink"}>linknsyncdev@gmail.com</Link>
                </div>
            )
        }
    </div>
);