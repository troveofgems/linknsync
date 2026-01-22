export interface Permissions {
    allowAccessTo: {
        profile: string[];
        propertyList: string[];
        propertyById: string[];
        calendar: string[];
        conflictList: string[];
        logs: string[];
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
    checkAndAllowAccessTo: (role: string, pathPermissions: string[]) => boolean;
    getLabelForRole: (
        role: string,
        pathPermissions: string[],
        labels:  {
            defaultLabel: string
            customLabel: string
        }) => string;
}

const // Application User Roles
    ROLE_PLA = "PLA",
    ROLE_ALA = "ALA",
    ROLE_RLA = "RLA",
    ROLE_IND = "IND";

const // Role Based Labels
    label_ForPropertyManagers = "Manage Properties",
    label_ForReferrers = "Available Properties";

export const RbacPermissions = (() => {
    const
        ALL_ROLES = [ROLE_PLA, ROLE_ALA, ROLE_RLA, ROLE_IND],
        PROPERTY_MANAGERS = [ROLE_PLA, ROLE_ALA, ROLE_IND];

    return {
        allowAccessTo: { // Pages
            profile: ALL_ROLES,
            propertyList: ALL_ROLES,
            propertyById: ALL_ROLES,
            calendar: PROPERTY_MANAGERS,
            conflictList: PROPERTY_MANAGERS,
            logs: PROPERTY_MANAGERS,
            organization: PROPERTY_MANAGERS,
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