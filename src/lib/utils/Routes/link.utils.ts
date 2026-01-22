import { APP_PATHS, NavLink } from "@/constants/nav.path.constants";

export const privateLinks = (orgRole: string): NavLink[] => {
    const { goToProfile, goToOrganization } = APP_PATHS.authenticatedPages.appUser;

    if(orgRole === "IND") {
        return [goToProfile];
    } else {
        return [goToProfile, goToOrganization.manageOrganization];
    }
};

export const adminLinks = (): NavLink[] => {
    const { goToAnalytics, goToUsers } = APP_PATHS.authenticatedPages.appAdmin;
    return [goToAnalytics, goToUsers];
}
