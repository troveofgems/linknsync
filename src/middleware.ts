import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import { APP_PATHS } from "@/constants/nav.path.constants";
import { INITIATE_JOB } from "@/api/job/route";

const
    { goToHomepage } = APP_PATHS.generalPages,
    isPublicRoute = createRouteMatcher([
        // Company
        '/',
        '/about',
        '/contact',
        '/roadmap',
        '/pricing',
        // Customers
        '/ourCustomers',
        '/tutorials',
        // Further Information
        '/toc',
        '/privacyPolicy',
        '/dataPolicy',
        '/techStack'
    ]),
    isAuthenticatedRoute = createRouteMatcher(['/dashboard(.*)']),
    isAPICronRoute = createRouteMatcher(['/api(.*)']),
    isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // Set Admin Account
    const isAdminUser = (await auth()).userId === process.env.MAIN_APP_ADMIN;

    // Send Non-Authenticated Requests to Admin Resources Back to Home
    if(isAdminRoute(req) && !isAdminUser) {
        return NextResponse.redirect(new URL(goToHomepage.path, req.url));
    }

    // Pass APIs - Authorization happens with Bearer Token on the Route Level of the Cron
    if(isAPICronRoute(req)) {
        return INITIATE_JOB(req);
    }

    // Lockdown all non-public routes
    if(!isPublicRoute(req) || isAuthenticatedRoute(req)) { await auth.protect(); }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/src/(api|trpc)(.*)',
    ],
};