import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import { APP_PATHS } from "@/constants/nav.path.constants";

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
        '/techStack',
        // Custom Errors
        '/error'
    ]),
    isAuthenticatedRoute = createRouteMatcher(['/dashboard(.*)']),
    isApiCronRoute = createRouteMatcher(['/api(.*)']),
    isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    if(isApiCronRoute(req)) {
        return NextResponse.next();
    }

    // Set Admin Account
    const isAdminUser = (await auth()).userId === process.env.MAIN_APP_ADMIN;

    // Send Non-Authenticated Requests to Admin Resources Back to Home
    if(isAdminRoute(req) && !isAdminUser) {
        return NextResponse.redirect(new URL(goToHomepage.path, req.url));
    }

    // Lockdown all non-public routes
    const lockdownRoute = !isPublicRoute(req) || isAuthenticatedRoute(req);
    if(lockdownRoute) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|xml|txt)).*)',
        // Always run for TRPC or API routes
        '/trpc(.*)',
        '/api(.*)',
    ],
};