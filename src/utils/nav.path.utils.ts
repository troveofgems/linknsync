import { NAV_PATH_CONSTANTS } from "@/constants/nav.path.constants";
import { RbacPermissions } from "@/rbac/rbac.permissions";

export interface NavLink {
    path: string;
    label: string;
    permissions?: string[];
}

type Path = string | ((pid: string) => string);
type RouteBuilder = {
    path: Path;
    label: string;
    permissions?: string[];
};

// Route Identifiers
const INVALID_PATH = "Invalid Path";
const BASE_PATH = NAV_PATH_CONSTANTS.baseUrl.path;
const PUBLIC = NAV_PATH_CONSTANTS.public.topLevelPath;
const PRIVATE = NAV_PATH_CONSTANTS.private.topLevelPath;
const ADMIN = NAV_PATH_CONSTANTS.admin.topLevelPath;
const ERROR = NAV_PATH_CONSTANTS.error.topLevelPath;

const _resolvePath = (
    { type, base, path }: {
        type: number;
        base: string;
        path: Path;
    }
) => {
    if(type === 0) { // Generic Home Route
        return `${base}`;
    } else if (type === 1) { // Simple Composite Route
        return `${base}${path}`;
    } else if (type === 2) { // Complex Composite Route - Function
        return ((pid: string) => `${base}${pid}${path}`);
    }
    return INVALID_PATH;
};

const _routeBuilder = (
    {
        topLevelPath, routeDefinition, type = 0, prependedPath, permissions
    }: {
        topLevelPath: string;
        routeDefinition: { path: Path; label: string };
        type?: number;
        prependedPath?: string;
        permissions?: string[];
    }
) => {
    const route: RouteBuilder = { path: "", label: "", permissions: undefined };

    // Build Nav Path Based on Top Level Path and Type of Route
    /**
     * Type 0: Basic Route "/"
     * Type 1: Simple Route "/" + SOME_PATH
     * Type 2: Composite Route "/" + SOME_ID + SOME_PATH
     * */
    switch(topLevelPath) {
        case "public":
            route.path = _resolvePath({
                type,
                base: BASE_PATH,
                path: routeDefinition.path
            }) as string;
            break;
        case "private":
            route.path = _resolvePath({
                type,
                base: !!prependedPath ? (BASE_PATH + prependedPath) : BASE_PATH,
                path: routeDefinition.path,
            });
            break;
        case "admin":
        case "error":
            route.path = _resolvePath({
                type: 1,
                base: BASE_PATH,
                path: routeDefinition.path
            }) as string;
            break;
        default:
            break;
    }

    // Attach Permissions Defined For Route If Any
    if(!!permissions) {
        route.permissions = permissions;
    }

    // Attach Defined Route Label
    route.label = routeDefinition.label;
    return route;
};

export const APP_PATHS = (() => (
    {
        pages: {
            general: {
                goToHomepage: _routeBuilder({
                    topLevelPath: PUBLIC,
                    routeDefinition: NAV_PATH_CONSTANTS.baseUrl
                }),
                goToCustomer: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.customers.ourCustomers,
                }),
                goToTutorials: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.customers.tutorials,
                }),
                goToWaitlist: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.customers.waitlist,
                }),
                goToAbout: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.company.about,
                }),
                goToContact: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.company.contact,
                }),
                goToRoadmap: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.company.roadmap,
                }),
                goToPricing: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.company.pricing,
                }),
                goToTermsAndConditions: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.policies.toc,
                }),
                goToPrivacyPolicy: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.policies.privacyPolicy,
                }),
                goToDataPolicy: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.policies.dataPolicy,
                }),
                goToTechStack: _routeBuilder({
                    topLevelPath: PUBLIC,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.public.policies.techStack
                }),
            },
            authenticated: {
                admin: {
                    goToAnalytics: _routeBuilder({
                        topLevelPath: ADMIN,
                        type: 1,
                        routeDefinition: NAV_PATH_CONSTANTS.admin.analytics
                    }),
                    goToPayments: _routeBuilder({
                        topLevelPath: ADMIN,
                        type: 1,
                        routeDefinition: NAV_PATH_CONSTANTS.admin.payments
                    }),
                    goToUsers: _routeBuilder({
                        topLevelPath: ADMIN,
                        type: 1,
                        routeDefinition: NAV_PATH_CONSTANTS.admin.users
                    }),
                },
                user: {
                    goToCalendar: _routeBuilder({
                        topLevelPath: PRIVATE,
                        type: 1,
                        prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                        routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.calendar,
                        permissions: RbacPermissions.allowAccessTo.calendar
                    }),
                    goToConflicts: _routeBuilder({
                        topLevelPath: PRIVATE,
                        type: 1,
                        prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                        routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.conflicts,
                        permissions: RbacPermissions.allowAccessTo.conflictList
                    }),
                    goToLogs: _routeBuilder({
                        topLevelPath: PRIVATE,
                        type: 1,
                        prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                        routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.logs,
                        permissions: RbacPermissions.allowAccessTo.logs
                    }),
                    goToOrganization: {
                        manageOrganization: _routeBuilder({
                            topLevelPath: PRIVATE,
                            type: 1,
                            prependedPath:
                                NAV_PATH_CONSTANTS.private.dashboard.path + "/" +
                                NAV_PATH_CONSTANTS.private.dashboard.sections.organization.path + "/",
                            routeDefinition: NAV_PATH_CONSTANTS.private
                                .dashboard.sections
                                .organization.sections.manageOrganization,
                            permissions: RbacPermissions.allowAccessTo.organization
                        }),
                        manageUsers: _routeBuilder({
                            topLevelPath: PRIVATE,
                            type: 1,
                            prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                            routeDefinition: NAV_PATH_CONSTANTS.private
                                .dashboard.sections
                                .organization.sections.manageOrganizationUsers,
                            permissions: RbacPermissions.allowAccessTo.organization
                        })
                    },
                    goToPayments: _routeBuilder({
                        topLevelPath: PRIVATE,
                        type: 1,
                        prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                        routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.payments,
                        permissions: RbacPermissions.allowAccessTo.payments
                    }),
                    goToProfile: _routeBuilder({
                        topLevelPath: PRIVATE,
                        type: 1,
                        prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                        routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.profile,
                        permissions: RbacPermissions.allowAccessTo.profile
                    }),
                    goToProperty: {
                        create: _routeBuilder({
                            topLevelPath: PRIVATE,
                            type: 1,
                            prependedPath:
                                NAV_PATH_CONSTANTS.private.dashboard.path + "/" +
                                NAV_PATH_CONSTANTS.private.dashboard.sections.property.topLevelPath,
                            routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.property.create,
                            permissions: RbacPermissions.restrictAccessFrom.createProperty
                        }),
                        list: _routeBuilder({
                            topLevelPath: PRIVATE,
                            type: 1,
                            prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                            routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.property.list,
                            permissions: RbacPermissions.allowAccessTo.propertyList
                        }),
                        manageIcals: _routeBuilder({
                            topLevelPath: PRIVATE,
                            type: 1,
                            prependedPath: NAV_PATH_CONSTANTS.private.dashboard.path + "/",
                            routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.property.sections.icals,
                            permissions: RbacPermissions.restrictAccessFrom.manageIcalSourcesForProperty
                        }),
                        view: _routeBuilder({
                            topLevelPath: PRIVATE,
                            type: 2,
                            prependedPath:
                                NAV_PATH_CONSTANTS.private.dashboard.path + "/" +
                                NAV_PATH_CONSTANTS.private.dashboard.sections.property.topLevelPath,
                            routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.property.view,
                            permissions: RbacPermissions.allowAccessTo.propertyById
                        }),
                        update: _routeBuilder({
                            topLevelPath: PRIVATE,
                            type: 2,
                            prependedPath:
                                NAV_PATH_CONSTANTS.private.dashboard.path + "/" +
                                NAV_PATH_CONSTANTS.private.dashboard.sections.property.topLevelPath,
                            routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.property.update,
                            permissions: RbacPermissions.restrictAccessFrom.updateProperty
                        }),
                    },
                    goToICals: _routeBuilder({
                        topLevelPath: PRIVATE,
                        type: 2,
                        prependedPath:
                            NAV_PATH_CONSTANTS.private.dashboard.path + "/" +
                            NAV_PATH_CONSTANTS.private.dashboard.sections.property.topLevelPath,
                        routeDefinition: NAV_PATH_CONSTANTS.private.dashboard.sections.property.sections.icals,
                        permissions: RbacPermissions.restrictAccessFrom.manageIcalSourcesForProperty
                    })
                }
            },
            error: {
                goTo400: _routeBuilder({
                    topLevelPath: ERROR,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.error._400
                }),
                goTo401: _routeBuilder({
                    topLevelPath: ERROR,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.error._401
                }),
                goTo402: _routeBuilder({
                    topLevelPath: ERROR,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.error._402
                }),
                goTo403: _routeBuilder({
                    topLevelPath: ERROR,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.error._403
                }),
                goTo404: _routeBuilder({
                    topLevelPath: ERROR,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.error._404
                }),
                goTo429: _routeBuilder({
                    topLevelPath: ERROR,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.error._429
                }),
                goTo500: _routeBuilder({
                    topLevelPath: ERROR,
                    type: 1,
                    routeDefinition: NAV_PATH_CONSTANTS.error._500
                }),
            }
        }
    }
))();