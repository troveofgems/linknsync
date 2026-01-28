import Link from "next/link";

export type PageContent = {
    key: string;
    label: string;
    verbiage?: string;
    listData?: string[];
    inShort?: string;
    paragraphs?: string[];
    showContact?: boolean;
}
export type StaticPageContent = PageContent[];

export const printSection = ({ key, label, verbiage, listData, inShort, paragraphs, showContact }: PageContent) => (
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
            !!showContact && (
                <div className={"mt-3"}>
                    <Link href="/contact">linknsyncdev@gmail.com</Link>
                </div>
            )
        }
    </div>
);