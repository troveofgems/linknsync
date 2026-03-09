const NO_VIEWABLE_CONTENT = process.env.THROWAWAY_ORG_ID;

const _determineUserType = (orgRole: string) => ({
    plaOrALAQuery: orgRole !== "IND" && orgRole !== "RLA" && (orgRole === "PLA"  || orgRole === "ALA"),
    indQuery: orgRole === "IND",
    rlaQuery: orgRole === "RLA"
});

export const constructedQuery = (
    {
        orgRole,
        coid,
        cid
    }: {
        orgRole: string;
        coid?: string;
        cid?: string;
    }) => {
    const { plaOrALAQuery, indQuery, rlaQuery } = _determineUserType(orgRole);
    let query = {};
    if(plaOrALAQuery) {
        query = {
            coid: coid ?? NO_VIEWABLE_CONTENT
        };
    } else if (indQuery) {
        query = {
            cid: cid ?? NO_VIEWABLE_CONTENT,
        };
    } else if (rlaQuery) {
        query = {
            coid: coid ?? NO_VIEWABLE_CONTENT,
        };
    }
    return query;
}