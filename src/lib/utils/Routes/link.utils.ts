import { APP_PATHS, NavLink } from "@/utils/nav.path.utils";

export const privateLinks = (orgRole: string): NavLink[] => {
    const { goToProfile, goToOrganization, goToPayments } = APP_PATHS.pages.authenticated.user;

    // Ind Users only have access to the Profile Link
    if(orgRole === "IND") {
        return [
            goToProfile as NavLink,
        ];
    }

    // PLA Users have access to Profile & Organization
    if(orgRole === "PLA") {
        return [
            goToProfile as NavLink,
            goToOrganization.manageOrganization as NavLink,
            goToPayments as NavLink,
        ];
    }

    return [
        goToProfile as NavLink,
        goToOrganization.manageOrganization as NavLink,
    ];
};

export const adminLinks = (): NavLink[] => {
    const { goToAnalytics, goToUsers } = APP_PATHS.pages.authenticated.admin;
    return [
        goToAnalytics as NavLink,
        goToUsers as NavLink
    ];
}
