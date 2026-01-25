import {create} from "zustand";
import {persist} from 'zustand/middleware';

interface ScheduledJobs {
    scheduledJobs: ScheduledJobState;
    runJob: (jobId: number) => unknown;
    stopJob: (jobId: number) => unknown;
    getError: () => Error | undefined;
}

export interface ScheduledJobState {
    jobId?:  number;
    isRunning: boolean;
    isLoadingJobState: boolean;
    error?: Error | unknown | null;
    data?: unknown;
    lastRun?: Date;
    nextRun?: Date;
}

const initialJobState = {
    jobId: undefined,
    isRunning: false,
    isLoadingJobState: true,
    error: undefined,
    data: undefined,
    lastRun: undefined,
    nextRun: undefined,
} as ScheduledJobState;

export const useScheduledJobsStore = create<ScheduledJobs, [["zustand/persist", ScheduledJobs]]>(
    persist(
        (set, get) => ({
            scheduledJobs: {...initialJobState},
            runJob: (jid) => set({
                scheduledJobs: {
                    jobId: jid,
                    isRunning: true,
                    isLoadingJobState: false,
                    error: undefined,
                    data: undefined,
                }
            }),
            stopJob: (jid) => set({
                scheduledJobs: {
                    jobId: undefined,
                    isRunning: false,
                    isLoadingJobState: false,
                    error: new Error(`Forcibly Stopped Job ${jid}`),
                    data: undefined,
                }
            }),
            getError: () => (get()?.scheduledJobs?.error as Error) || undefined,
        }),
        {
            name: "jobs-storage"
        }
    )
);

/*
export const setInitializedScheduledJobData = (
    data
) => {
    useUserStore.getState().runQuery(); // Resets User Attributes For Query
    try {
        const // Check for Existing Instantiation
            test = null;

        if(true) {
            /!*useUserStore.setState({
                user: {
                    attrs: {
                        loggedInUser,
                        profile,
                    },
                    isAuthenticated: true,
                    isLoading: false,
                    error: undefined
                }
            });*!/
        } else {
            const { message } = result as Error;
            console.error(`Unable To Initialize Scheduled Jobs: ${message}`);
        }
    } catch(error) {
        console.error("Error Initializing Scheduled Jobs", error);
        useUserStore.setState({
            user: {
                attrs: {
                    loggedInUser: undefined,
                    profile: undefined
                },
                isLoading: false,
                data: undefined,
                error: error instanceof Error ? error : new Error("Failed To Initialize Scheduled Jobs")
            }
        });
    }
};*/
