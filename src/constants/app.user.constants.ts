export const
    PLA_ORG_ROLE_LABEL = "Primary Listing Agent",
    ALA_ORG_ROLE_LABEL = "Additional Listing Agent",
    RLA_ORG_ROLE_LABEL = "Referring Listing Agent",
    IND_ORG_ROLE_LABEL = "Independent Listing Agent",
    SUPER_USER_LABEL = "Super Administrator";

export const
    ORG_ROLE__PRIMARY_LISTING_AGENT = "PLA",
    ORG_ROLE__ASSISTANT_LISTING_AGENT = "ALA",
    ORG_ROLE__REFERRING_LISTING_AGENT = "RLA",
    NO_ORG = "IND";

export const
    ORG_ROLE__ID_SUPER_USER = "org:super_admin",
    ORG_ROLE__ID_PLA = "org:pla",
    ORG_ROLE__ID_ALA = "org:ala",
    ORG_ROLE__ID_RLA = "org:rla",
    NO_ORG__ID = "Independent";

export const APP_USER_MAPPINGS = {
    "pla": {
        roleLabel: PLA_ORG_ROLE_LABEL,
        roleCode: ORG_ROLE__PRIMARY_LISTING_AGENT,
        id: ORG_ROLE__ID_PLA
    },
    "ala": {
        roleLabel: ALA_ORG_ROLE_LABEL,
        roleCode: ORG_ROLE__ASSISTANT_LISTING_AGENT,
        id: ORG_ROLE__ID_ALA
    },
    "rla": {
        roleLabel: RLA_ORG_ROLE_LABEL,
        roleCode: ORG_ROLE__REFERRING_LISTING_AGENT,
        id: ORG_ROLE__ID_RLA
    },
    "ind": {
        roleLabel: IND_ORG_ROLE_LABEL,
        roleCode: NO_ORG,
        id: NO_ORG__ID
    },
};