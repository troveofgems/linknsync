import type { NextRequest } from 'next/server';
import {fetchSystemScheduledJobs} from "@/actions/cronService/read.action";

export function INITIATE_JOB(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    console.log("Run the Cron", request.headers);
    fetchSystemScheduledJobs().then((onfulfilled) => {
        console.log("Scheduled jobs completed...", onfulfilled);
    }, (onrejected: unknown) => {
        console.error("Unable to complete scheduled jobs...", onrejected);
    })

    return Response.json({data: {message: "Cron Successfully Initiated..."}, success: true});
}