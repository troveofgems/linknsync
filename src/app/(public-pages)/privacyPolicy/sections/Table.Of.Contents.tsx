import Link from "next/link";
import {PageContent, printSection, StaticPageContent} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";

const pageContents: StaticPageContent = [{
    key: "privacy-policy-table-of-contents",
    label: "Table of Contents",
    verbiage: ""
}];

export const TableOfContents = () => (
    <div className={"flex flex-col w-1/2 m-auto"}>
        <div>
            {
                pageContents.map((pageContent: PageContent) => printSection(pageContent))
            }
            <ol type={"1"}>
                <li className={"link"}>
                    <Link href={""}>
                        1. What Information Do We Collect?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        2. How Do We Process Your Information?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        3. When and With Whom Do We Share Your Personal Information?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        4. Do We Use Cookies and Other Tracking Technologies?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        5. How Do We Handle Social Logins?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        6. How Long Do We Keep Your Information?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        7. How Do We Keep Your Information Safe?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        8. Do We Collect Information From Minors?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        9. What Are Your Privacy Rights?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        10. Controls For Do-Not-Track Features
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        11. Do United States Residents Have Specific Privacy Rights?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        12. Do We Make Updates To This Policy?
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        13. How Can You Contact Us About This Policy
                    </Link>
                </li>
                <li>
                    <Link href={""}>
                        14. How Can You Review, Update, or Delete the Data We Collect From You?
                    </Link>
                </li>
            </ol>
        </div>
    </div>
)