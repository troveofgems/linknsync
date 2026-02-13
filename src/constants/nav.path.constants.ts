import {RbacPermissions} from "@/rbac/rbac.permissions";
/**
 * Application Navigation Path Constants
 * */
export const NAV_PATH_CONSTANTS = {
    baseUrl: {
        path: "/",
        label: "Home"
    },
    public: {
        customers: {
            ourCustomers: {
                path: "ourCustomers",
                label: "STVR Property Managers"
            },
            tutorials: {
                path: "tutorials",
                label: "Tutorials"
            },
            waitlist: {
                path: "waitlist",
                label: "Waitlist"
            },
        },
        company: {
            about: {
                path: "about",
                label: "About Us"
            },
            contact: {
                path: "contact",
                label: "Contact Us"
            },
            roadmap: {
                path: "roadmap",
                label: "Our Future Roadmap"
            },
            pricing: {
                path: "pricing",
                label: "Pricing"
            },
        },
        policies: {
            toc: {
              path: "toc",
              label: "Terms & Conditions",
            },
            privacyPolicy: {
                path: "privacyPolicy",
                label: "Privacy Policy"
            },
            dataPolicy: {
                path: "dataPolicy",
                label: "Data Policy"
            },
            techStack: {
                path: "techStack",
                label: "Technology Stack"
            }
        },
        topLevelPath: "public"
    },
    private: {
        dashboard: {
            path: "dashboard",
            label: "Private Dashboard",
            sections: {
                calendar: {
                    path: "calendar",
                    label: "Calendar",
                    permissions: RbacPermissions.allowAccessTo.calendar,
                },
                conflicts: {
                    path: "conflicts",
                    label: "Conflicts",
                    permissions: RbacPermissions.allowAccessTo.conflictList
                },
                logs: {
                    path: "logs",
                    label: "Logs",
                    permissions: RbacPermissions.allowAccessTo.logs
                },
                organization: {
                    path: "organization",
                    label: "My Organization",
                    sections: {
                        manageOrganization: {
                            path: "manage-organization",
                            label: "My Organization",
                            permissions: RbacPermissions.allowAccessTo.organization
                        },
                        manageOrganizationUsers: {
                            path: "organization-members",
                            label: "Manage Organization Members",
                            permissions: RbacPermissions.allowAccessTo.organization
                        }
                    }
                },
                payments: {
                    path: "payments",
                    label: "Payments",
                    permissions: RbacPermissions.allowAccessTo.payments
                },
                profile: {
                    path: "profile",
                    label: "Profile",
                    permissions: RbacPermissions.allowAccessTo.profile
                },
                property: {
                    topLevelPath: "properties/",
                    create: {
                        path: "create",
                        label: "Create Property",
                        permissions: RbacPermissions.restrictAccessFrom.createProperty
                    },
                    list: {
                        path: "properties",
                        label: "Property List",
                        permissions: RbacPermissions.allowAccessTo.propertyList
                    },
                    update: {
                        path: "/update", // Receives PID
                        label: "Update Property",
                        permissions: RbacPermissions.restrictAccessFrom.updateProperty
                    },
                    view: {
                        path: "/read", // Receives PID
                        label: "View Property",
                        permissions: RbacPermissions.allowAccessTo.propertyById
                    },
                    sections: {
                        icals: {
                            path: "/manageIcalSources", // Receives PID
                            label: "Manage Ical Sources",
                            permissions: RbacPermissions.restrictAccessFrom.manageIcalSourcesForProperty
                        }
                    }
                }
            }
        },
        topLevelPath: "private"
    },
    admin: {
        analytics: {
            path: "admin/analytics",
            label: "Analytics",
        },
        payments: {
            path: "admin/payments",
            label: "Payments",
        },
        users: {
            path: "admin/users",
            label: "Users",
        },
        topLevelPath: "admin"
    },
    error: {
        topLevelPath: "error",
        _400: {
            path: "error?err=400&data=null",
            label: "Error: Bad Request"
        },
        _401: {
            path: "error?err=401&data=null",
            label: "Error: Unauthorized"
        },
        _402: {
            path: "error?err=402&data=null",
            label: "Error: Payment Required"
        },
        _403: {
            path: "error?err=403&data=null",
            label: "Error: Forbidden"
        },
        _404: {
            path: "error?err=404&data=null",
            label: "Error: Resource Not Found"
        },
        _429: {
            path: "error?err=429&data=null",
            label: "Error: Too Many Requests"
        },
        _500: {
            path: "error?err=500&data=null",
            label: "Error: Internal Server Error"
        },
    }
};