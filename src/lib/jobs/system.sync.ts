import "server-only";
import {fetchSystemScheduledJobs} from "@/actions/cronService/read.action";

export async function SystemSync() {
    await fetchSystemScheduledJobs();
    return Response.json({data: {message: "Cron Successfully Began..."}, success: true})
}

