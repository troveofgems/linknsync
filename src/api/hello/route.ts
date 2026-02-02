import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
    console.log("Inside GET Request for Cron...");
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    return Response.json({ success: true });
}