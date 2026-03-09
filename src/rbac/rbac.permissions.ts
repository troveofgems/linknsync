export interface Permissions {
    allowAccessTo: {
        profile: string[];
        propertyList: string[];
        propertyById: string[];
        calendar: string[];
        conflictList: string[];
        logs: string[];
        payments: string[];
        pmsConnections: string[];
        organization: string[];
    }
    restrictAccessFrom: {
        manageIcalSourcesForProperty: string[];
        createProperty: string[];
        updateProperty: string[];
        deleteProperty: string[];
    };
    roleBasedLabels: {
        forProperty: {
            defaultLabelPermissions: string[];
            labels: {
                defaultLabel: string;
                customLabel: string;
            }
        }
    },
    checkAndAllowAccessTo: (
        role: string,
        pathPermissions: string[]
    ) => boolean;
    getLabelForRole: (
        role: string,
        pathPermissions: string[],
        labels:  {
            defaultLabel: string;
            customLabel: string;
        }
    ) => string;
}

const // Application User Roles
    ROLE_SUA = "SUA", // Super User Administrator
    ROLE_SAU = "SAU", // Super Audit User
    ROLE_PLA = "PLA", // Primary Listing Agent
    ROLE_ALA = "ALA", // Additional Listing Agent
    ROLE_RLA = "RLA", // Referral Listing Agent
    ROLE_IND = "IND"; // Individual User With No Instantiated Org Yet

const // Role Based Labels
    label_ForPropertyManagers = "Manage Properties",
    label_ForReferrers = "Available Properties";

export const RbacPermissions = (() => {
    const
        ALL_NON_ADMIN_ROLES = [ROLE_PLA, ROLE_ALA, ROLE_RLA, ROLE_IND],
        PROPERTY_MANAGERS = [ROLE_PLA, ROLE_ALA, ROLE_IND],
        APP_ADMINISTRATORS = [ROLE_SUA, ROLE_SAU],
        ALL_ROLES = [...ALL_NON_ADMIN_ROLES, ...APP_ADMINISTRATORS];

    return {
        allowAccessTo: { // Pages
            profile: ALL_ROLES,
            propertyList: ALL_ROLES,
            propertyById: ALL_ROLES,
            calendar: [...PROPERTY_MANAGERS, ...APP_ADMINISTRATORS],
            conflictList: [...PROPERTY_MANAGERS, ...APP_ADMINISTRATORS],
            logs: [...PROPERTY_MANAGERS, ...APP_ADMINISTRATORS],
            payments: [ROLE_PLA, ...APP_ADMINISTRATORS], // Only PLAs should see or use the payments functionality
            pmsConnections: [ROLE_PLA],
            organization: [...PROPERTY_MANAGERS, ...APP_ADMINISTRATORS],
        },
        restrictAccessFrom: { // Actions
            manageIcalSourcesForProperty: [ROLE_RLA],
            createProperty: [ROLE_ALA, ROLE_RLA],
            updateProperty: [ROLE_ALA, ROLE_RLA],
            deleteProperty: [ROLE_ALA, ROLE_RLA],
        },
        roleBasedLabels: {
            forProperty: {
                defaultLabelPermissions: PROPERTY_MANAGERS,
                labels: {
                    defaultLabel: label_ForPropertyManagers,
                    customLabel: label_ForReferrers,
                }
            }
        },
        checkAndAllowAccessTo: (
            userRole: string,
            pathPermissions: string[],
        ): boolean => (
            !pathPermissions.some((restrictedFromAccess) => userRole === restrictedFromAccess)
        ),
        getLabelForRole: (
            role: string,
            labelPermissions: string[],
            labels: { defaultLabel: string, customLabel: string }
        ) => labelPermissions.some((permissionLabel: string) => permissionLabel === role) ?
            labels.defaultLabel : labels.customLabel
    } as Permissions;
})();