/**
 * This File exports the App User Helper Functions For the App
 * */
import {
    PLA_ORG_ROLE_LABEL, ALA_ORG_ROLE_LABEL, RLA_ORG_ROLE_LABEL, IND_ORG_ROLE_LABEL,
    SUPER_USER_LABEL
} from "@/constants/app.user.constants";

export const getUserRoleLabel = (
    {
        isAdmin = false,
        orgRole = AppRole.IND
    }:
    {
        isAdmin: boolean;
        orgRole: AppRole
    }
) => {
  let label = IND_ORG_ROLE_LABEL;

  if(isAdmin) {
      label = SUPER_USER_LABEL;
  } else {
      switch(orgRole) {
          case AppRole.PLA:
              label = PLA_ORG_ROLE_LABEL;
              break;
          case AppRole.ALA:
              label = ALA_ORG_ROLE_LABEL;
              break;
          case AppRole.RLA:
              label = RLA_ORG_ROLE_LABEL;
              break;
          default:
              break;
      }
  }

  return label;
};

export const getUserRole = (
    {
        isAdmin = false,
        orgRole
    }:
    {
        isAdmin: boolean;
        orgRole: string;
    }
) => {
    if(isAdmin) return AppRole.PLA as string;
    switch(orgRole) {
        case "org:super_admin":
        case "org:pla":
            return AppRole.PLA as string;
        case "org:ala":
            return AppRole.ALA as string;
        case "org:rla":
            return AppRole.RLA as string;
        default:
            return AppRole.IND as string;
    }
};

// Enum Definitions
export enum AppRole {
    PLA = "PLA",
    ALA = "ALA",
    RLA = "RLA",
    IND = "IND",
}