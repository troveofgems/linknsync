import {
    StaticPageContent, PageKey, SectionLabel,
    printSectionWrapper,
} from "@/utils/static.page.content.utils";

const
    HEADER = "11. Dispute Resolution",
    SUB_LIST = [
        {
            paragraph: "Informal Negotiations",
            desc: "To expedite resolution and control the cost of any dispute, controversy, or claim related to these " +
                "Legal Terms (each a 'Dispute' and collectively, the 'disputes') brought by either you or us (" +
                "Individually or as a 'Parties'), the Parties agree to first attempt to negotiate any Dispute (Except " +
                "those Disputes expressly provided below) informally for at least 30 days before initiating arbitration." +
                "Such informal negotiations commence upon written notice from one Party to the other Party.",
            list: []
        },
        {
            paragraph: "Binding Arbitration",
            desc: "Any dispute arising out of or in connection with these Legal Terms, including any question regarding its existence, " +
                "validity, or termination, shall be referred to and finally resolved by the Internal Commercial Arbitration Court " +
                "under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC, which, " +
                "as a result of referring to it is considered as part of this clause. The number of arbitrators shall be two. The seat, " +
                "or legal place, or arbitration shall be Maricopa County. The language of the proceedings shall be in english. The governing law " +
                "of these Legal Terms shall be the substantive law of the United States.",
            list: []
        },
        {
            paragraph: "Restrictions",
            desc: "The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. " +
                "To the fullest extent permitted by law: ",
            list: [
                "No arbitration shall be joined with any other proceeding;",
                "There is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize " +
                "class action procedures",
                "There is no right or authority for any Dispute to be brought in a purported representative capacity on behalf " +
                "of the general public or any other persons."
            ]
        },
        {
            paragraph: "Exceptions to Informal Negotiations and Arbitration",
            desc: "The Parties agree that the following Disputes are not subject to the above provision concerning informal negotiations binding arbitration:",
            list: [
                "Any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party;",
                "Any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and",
                "Any claim for injunctive relief."
            ],
            finalParagraph: "If this provision is found to be illegal or unenforceable, then neither Party will elect to " +
                "arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such " +
                "Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, " +
                "and the Parties agree to submit to the personal jurisdiction of that court."
        },
    ]

const pageContents = (
    pageKey: PageKey,
    sectionLabel: SectionLabel,
): StaticPageContent => ([{
    key: `${pageKey}-${sectionLabel.replaceAll(" ", "-").toLowerCase()}`,
    sectionLabel,
    label: HEADER,
    paragraphList: SUB_LIST,
}]);

// DO NOT CHANGE TEMPLATE CODE BELOW
export const DisputeResolution = (
    { pageKey, sectionLabel }:
    { pageKey: PageKey, sectionLabel: SectionLabel }) => (
    printSectionWrapper(pageContents(pageKey, sectionLabel))
);