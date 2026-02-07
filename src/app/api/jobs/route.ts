import type { NextRequest } from 'next/server';
import {SystemSync} from "@/lib/jobs/system.sync";

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    console.log("Running the Cron", request.url);
    await SystemSync();

    return Response.json({data: {message: "Cron Successfully Initiated..."}, success: true});
}

export const dynamic = "force-dynamic";