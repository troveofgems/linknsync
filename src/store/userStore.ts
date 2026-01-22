import {create} from "zustand";
import {persist} from 'zustand/middleware';
import {fetchSessionData} from "@/actions/user/auth.actions";
import {AppRole} from "@/lib/utils/AppUser/app.user.utils";
import { UserResource } from "@clerk/types";

export interface LoggedInUserState {
    cid?: string;
    userId?: string;
    orgRole?: AppRole | string | null;
    isAdmin?: boolean;
    lastSignInAt?: Date | number | null;
    accountCreatedOn?: Date | number | null;
    sessionId?: string;
    lastActivity?: number | null;
}

export interface UserProfileState {
    fullName: string;
    email: string;
    phoneNumber: string;
    lastSignInAt: number;
    username: string;
    hasImage: boolean;
    imageUrl: string;
    actions: {
        locked: boolean;
        banned: boolean;
        passwordEnabled: boolean;
    },
    org: {
        id: string;
        name: string;
        permissions: string[];
    };
}

export interface SessionDataState {
    loggedInUser?: LoggedInUserState;
    profile?: UserProfileState;
}

export interface UserState {
    attrs?: SessionDataState;
    isAuthenticated: boolean;
    isLoading: boolean;
    error?: Error | unknown | null;
}

export interface AuthenticationState {
    user: UserState;
    logout: () => void;
    sessionLoaded: () => boolean | undefined;
    runQuery: () => void | undefined;
    getUserProfile: () => UserProfileState | undefined;
    getLoggedInUser: () => LoggedInUserState | undefined;
    getError: () => Error | string | undefined;
    getRemainingSessionTime: () => {
        sessionElapsed: boolean;
        remainingSessionTime: string;
    };
    rejectRequest: () => void | undefined;
    reloadSession: () => void | undefined;
}

const userState = {
    attrs: undefined,
    isAuthenticated: false,
    error: undefined
} as UserState;

const SESSION_DURATION = 4 * 60 * 60 * 1000;

export const useUserStore = create<AuthenticationState, [["zustand/persist", AuthenticationState]]>(
    persist(
        (set, get) => ({
            user: {...userState},
            logout: () => set({
                user: {
                    attrs: {
                        loggedInUser: undefined,
                        profile: undefined,
                    },
                    isAuthenticated: false,
                    isLoading: false
                }
            }),
            sessionLoaded: () => {
                const sessionData = get().user;
                return (!!sessionData && !!sessionData.attrs && sessionData.isAuthenticated) as boolean;
            },
            runQuery: () => set({
                user: {
                    isLoading: true,
                    isAuthenticated: false,
                    error: undefined
                }
            }),
            getUserProfile: () => get()?.user?.attrs?.profile || undefined,
            getLoggedInUser: () => get()?.user?.attrs?.loggedInUser || undefined,
            getError: () => (get()?.user?.error as Error) || undefined,
            getRemainingSessionTime: () => {
              const
                  now = new Date().getTime(),
                  lastActivity = get()?.user?.attrs?.loggedInUser?.lastActivity || 0,
                  elapsedTime = now - lastActivity,
                  remainingSessionTime = Math.max(0, SESSION_DURATION - elapsedTime),
                  hours = Math.floor(remainingSessionTime / (60 * 60 * 1000)),
                  minutes = Math.floor((remainingSessionTime % (60 * 60 * 1000)) / (60 * 1000)),
                  seconds = Math.floor((remainingSessionTime % (60 * 1000)) / 1000);

              return {
                  sessionElapsed: remainingSessionTime <= 0,
                  remainingSessionTime: `Remaining Session Time: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
              };
            },
            rejectRequest: () => set({
                user: {
                    attrs: undefined,
                    isLoading: false,
                    isAuthenticated: false,
                    error: "No ClerkId Provided."
                }
            }),
            reloadSession: () => {
                setInitializedSessionData({} as UserResource, true);
            }
        }),
        {
            name: "user-storage"
        }
    )
);

export const setInitializedSessionData = (
    data: UserResource,
    forceRefresh: boolean
) => {
    useUserStore.getState().runQuery(); // Resets User Attributes For Query
    try {
        fetchSessionData()
            .then((result) => {
                const // Limit Sessions To Four Hours
                    { loggedInUser, profile } = result as SessionDataState,
                    userStateExists = !!useUserStore.getState().user,
                    lastActivity = (
                        !!useUserStore?.getState()?.user?.attrs?.loggedInUser &&
                        useUserStore.getState()!.user!.attrs!.loggedInUser!.lastActivity!
                    ) as number || null,
                    lastActivityExists = !!lastActivity,
                    fourHourSessionLimitReached =
                        !forceRefresh &&
                        userStateExists &&
                        lastActivityExists &&
                        (Date.now() - lastActivity) < 14400000;

                if(fourHourSessionLimitReached) {
                    useUserStore.setState({
                        user: {
                            attrs: {
                                loggedInUser: undefined,
                                profile: undefined
                            },
                            isLoading: false,
                            isAuthenticated: false,
                            error: new Error("Session Expired.")
                        }
                    });
                    return;
                }

                if(!!loggedInUser && !!profile && forceRefresh) {
                    useUserStore.setState({
                        user: {
                            attrs: {
                                loggedInUser,
                                profile,
                            },
                            isAuthenticated: true,
                            isLoading: false,
                            error: undefined
                        }
                    });
                }

                if(!!loggedInUser && !!profile) {
                    useUserStore.setState({
                        user: {
                            attrs: {
                                loggedInUser,
                                profile,
                            },
                            isAuthenticated: true,
                            isLoading: false,
                            error: undefined
                        }
                    });
                } else {
                    const { message } = result as Error;
                    if(message === "Reject Request") { return useUserStore.getState().rejectRequest(); }
                }
        });
    } catch(error) {
        console.error("Error Initializing Session", error);
        useUserStore.setState({
            user: {
                attrs: {
                    loggedInUser: undefined,
                    profile: undefined
                },
                isLoading: false,
                isAuthenticated: false,
                error: error instanceof Error ? error : new Error("Failed To Initialize Session")
            }
        });
    }
};