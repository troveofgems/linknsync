import {RbacPermissions} from "@/rbac/rbac.permissions";

export interface NavLink {
    path: string;
    label: string;
    permissions?: string[];
}

const // Hardcoded Constants
    BASE_URL = "/",
    // App Authenticated Segments
    admin = "admin",
    dashboard = "dashboard",
    organization = "organization",
    // Dashboard Authenticated Segments
    profile = "profile",
    properties = "properties",
    calendar = "calendar",
    conflicts = "conflicts",
    logs = "logs",
    createProperty = "create",
    viewProperty = "read",
    updateProperty = "update",
    manageIcalSources = "manageIcalSources",
    // Organization Authenticated Segments
    manageOrganization = "manage-organization",
    manageOrganizationUsers = "organization-members",
    // Admin Authenticated Segments
    analytics = "analytics",
    users = "users",
    // General Segments
    about = "about",
    ourCustomers = "ourCustomers",
    tutorials = "tutorials",
    contact = "contact",
    roadmap = "roadmap",
    pricing = "pricing",
    toc = "toc",
    privacyPolicy = "privacyPolicy",
    dataPolicy = "dataPolicy",
    techStack = "techStack",
    // Error Segments
    error400 = "error400",
    error401 = "error401",
    error402 = "error402",
    error403 = "error403",
    error404 = "error404",
    error429 = "error429",
    error500 = "error500";

const // Hardcoded Labels
    // Admin Labels
    label_Analytics = "Analytics",
    label_Users = "Users",
    // Error Labels
    label_Error400 = "Error 400 - Bad Request",
    label_Error401 = "Error 401 - Unauthorized",
    label_Error402 = "Error 402 - Payment Required",
    label_Error403 = "Error 403 - Forbidden",
    label_Error404 = "Error 404 - Not Found",
    label_Error429 = "Error 429 - Too Many Requests",
    label_Error500 = "Error 500 - Internal Server Error",
    // Page/Bar Labels
    label_Homepage = "Home",
    label_About = "About Us",
    label_OurCustomers = "STVR Property Managers",
    label_Tutorials = "Tutorials",
    label_Contact = "Contact Us",
    label_Roadmap = "Our Future Roadmap",
    label_Pricing = "Pricing",
    label_TermsAndConditions = "Terms & Conditions",
    label_PrivacyPolicy = "Privacy Policy",
    label_DataPolicy = "Data Policy",
    label_TechStack = "Technology Stack";

/** App Path Constants & Builders **/
export const APP_PATHS = (() => {
    const rbacPermissions = RbacPermissions;

    const // Dashboard Authenticated Pages
        ADMIN_PATH = `${BASE_URL}${admin}`,
        CALENDAR_PATH = `${BASE_URL}${dashboard}/${calendar}`,
        CONFLICTS_PATH = `${BASE_URL}${dashboard}/${conflicts}`,
        LOGS_PATH = `${BASE_URL}${dashboard}/${logs}`,
        ORGANIZATION_PATH = `${BASE_URL}${dashboard}/${organization}`,
        PROFILE_PATH = `${BASE_URL}${dashboard}/${profile}`,
        PROPERTY_PATH = `${BASE_URL}${dashboard}/${properties}`;

    const // Property Authenticated Pages
        PATH_createProperty = `${PROPERTY_PATH}/${createProperty}`,
        PATH_updateProperty = (pid: string) => `${PROPERTY_PATH}/${pid}/${updateProperty}`,
        PATH_viewProperty = (pid: string) => `${PROPERTY_PATH}/${pid}/${viewProperty}`,
        PATH_manageICalSourcesForProperty = (pid: string) => `${PROPERTY_PATH}/${pid}/${manageIcalSources}`;

    const // Organization Authenticated Pages
        PATH_manageOrganization = `${ORGANIZATION_PATH}/${manageOrganization}`,
        PATH_manageOrganizationUsers = `${ORGANIZATION_PATH}/${manageOrganizationUsers}`;

    const // Admin Authenticated Pages
        PATH_adminAnalytics = `${ADMIN_PATH}/${analytics}`,
        PATH_adminUsers = `${ADMIN_PATH}/${users}`;

    const // Un-Authenticated General Pages
        aboutPage = `${BASE_URL}${about}`,
        customerPage = `${BASE_URL}${ourCustomers}`,
        tutorialsPage = `${BASE_URL}${tutorials}`,
        contactPage = `${BASE_URL}${contact}`,
        roadmapPage = `${BASE_URL}${roadmap}`,
        pricingPage = `${BASE_URL}${pricing}`;

    const // Un-Authenticated Legal Pages
        tocPage = `${BASE_URL}${toc}`,
        privacyPolicyPage = `${BASE_URL}${privacyPolicy}`,
        dataPolicyPage = `${BASE_URL}${dataPolicy}`,
        techStackPage = `${BASE_URL}${techStack}`;

    const // Custom Error Paths
        path_Error400 = `${BASE_URL}${error400}`,
        path_Error401 = `${BASE_URL}${error401}`,
        path_Error402 = `${BASE_URL}${error402}`,
        path_Error403 = `${BASE_URL}${error403}`,
        path_Error404 = `${BASE_URL}${error404}`,
        path_Error429 = `${BASE_URL}${error429}`,
        path_Error500 = `${BASE_URL}${error500}`;

    return {
        authenticatedPages: {
            appAdmin: {
                goToAnalytics: {
                    path: PATH_adminAnalytics,
                    label: label_Analytics,
                },
                goToUsers: {
                    path: PATH_adminUsers,
                    label: label_Users,
                }
            },
            appUser: {
                goToCalendar: {
                    path: CALENDAR_PATH,
                    label: "Calendar",
                    permissions: rbacPermissions.allowAccessTo.calendar,
                },
                goToConflicts: {
                    path: CONFLICTS_PATH,
                    label: "Conflict Detection",
                    permissions: rbacPermissions.allowAccessTo.conflictList
                },
                goToLogs: {
                    path: LOGS_PATH,
                    label: "Logs",
                    permissions: rbacPermissions.allowAccessTo.logs
                },
                goToOrganization: {
                    manageOrganization: {
                        path: PATH_manageOrganization,
                        label: "My Organization",
                        permissions: rbacPermissions.allowAccessTo.organization
                    },
                    manageOrganizationUsers: {
                        path: PATH_manageOrganizationUsers,
                        label: "Manage Organization Users",
                        permissions: rbacPermissions.allowAccessTo.organization
                    }
                },
                goToProfile: {
                    path: PROFILE_PATH,
                    label: "My Profile",
                    permissions: rbacPermissions.allowAccessTo.profile
                },
                goToProperty: {
                    viewPropertyList: {
                        path: PROPERTY_PATH,
                        label: "Property List",
                        permissions: rbacPermissions.allowAccessTo.propertyList
                    },
                    viewPropertyById: {
                        path: PATH_viewProperty,
                        label: "View Property",
                        permissions: rbacPermissions.allowAccessTo.propertyById
                    },
                    createProperty: {
                        path: PATH_createProperty,
                        label: "Create Property",
                        permissions: rbacPermissions.restrictAccessFrom.createProperty
                    },
                    updateProperty: {
                        path: PATH_updateProperty,
                        label: "Update Property",
                        permissions: rbacPermissions.restrictAccessFrom.updateProperty
                    },
                    manageIcalSourcesForProperty: {
                        path: PATH_manageICalSourcesForProperty,
                        label: "Manage Ical Sources",
                        permissions: rbacPermissions.restrictAccessFrom.manageIcalSourcesForProperty
                    },
                }
            }
        },
        errorPages: {
            goToError400: {
                path: path_Error400,
                label: label_Error400,
            },
            goToError401: {
                path: path_Error401,
                label: label_Error401,
            },
            goToError402: {
                path: path_Error402,
                label: label_Error402,
            },
            goToError403: {
                path: path_Error403,
                label: label_Error403,
            },
            goToError404: {
                path: path_Error404,
                label: label_Error404,
            },
            goToError429: {
                path: path_Error429,
                label: label_Error429,
            },
            goToError500: {
                path: path_Error500,
                label: label_Error500,
            }
        },
        generalPages: {
            goToHomepage: {
                path: BASE_URL,
                label: label_Homepage,
            },
            goToAbout: {
                path: aboutPage,
                label: label_About,
            },
            goToCustomer: {
                path: customerPage,
                label: label_OurCustomers
            },
            goToTutorials: {
                path: tutorialsPage,
                label: label_Tutorials
            },
            goToContact: {
                path: contactPage,
                label: label_Contact,
            },
            goToRoadmap: {
                path: roadmapPage,
                label: label_Roadmap
            },
            goToPricing: {
                path: pricingPage,
                label: label_Pricing
            },
            goToTermsAndConditions: {
                path: tocPage,
                label: label_TermsAndConditions,
            },
            goToPrivacyPolicy: {
                path: privacyPolicyPage,
                label: label_PrivacyPolicy,
            },
            goToDataPolicy: {
                path: dataPolicyPage,
                label: label_DataPolicy,
            },
            goToTechStack: {
                path: techStackPage,
                label: label_TechStack,
            }
        },
    };
})();