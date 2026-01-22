import {scheduleJob, gracefulShutdown} from "node-schedule";
import {fetchSystemScheduledJobs} from "@/actions/cronService/read.action";
let initialized = false;

export function initializeAppJobScheduler() {
    if (!initialized) {
        scheduleJob('*/1 * * * *', function() {
            fetchSystemScheduledJobs().then(() => {});
        });
        process.on("SIGINT", () => clearJob().then(() => process.exit(0)));
        initialized = true;
    }
}

export const clearJob = async () => {
    await gracefulShutdown();
}