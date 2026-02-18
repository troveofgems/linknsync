//import db from "@prisma/client";

import {Subscription} from "@prisma/client";

export type SubscriptionDetails = {
    id: string;
    productId: string;
    status: string;
    amount: number;
    currency: string;
    recurringInterval: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    canceledAt: Date | null;
    organizationId: string | null;
};

export type SubscriptionDetailsResult = {
    hasSubscription: boolean;
    subscription?: SubscriptionDetails;
    error?: string;
    errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

export async function getSubscriptionDetails(): Promise<SubscriptionDetailsResult> {
    try {
        const userSubscriptions: Partial<Subscription>[] = []; /*await db
            .select()
            .from(subscription)
            .where(eq(subscription.userId, session.user.id));*/

        console.log("User Already Subscribed? ", userSubscriptions);

        if (!userSubscriptions.length) {
            return { hasSubscription: false };
        }

        // Get the most recent active subscription
        const activeSubscription = userSubscriptions
            .filter((sub) => sub.status === "active")
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

        if (!activeSubscription) {
            // Check for canceled or expired subscriptions
            const latestSubscription = userSubscriptions
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

            if (latestSubscription) {
                const now = new Date();
                const isExpired = new Date(latestSubscription.currentPeriodEnd as Date) < now;
                const isCanceled = latestSubscription.status === "canceled";

                return {
                    hasSubscription: true,
                    subscription: {
                        id: latestSubscription.id as string,
                        productId: latestSubscription.productId as string,
                        status: latestSubscription.status as string,
                        amount: parseInt(latestSubscription.amount as string),
                        currency: latestSubscription.currency as string,
                        recurringInterval: latestSubscription.recurringInterval as string,
                        currentPeriodStart: latestSubscription.currentPeriodStart as Date,
                        currentPeriodEnd: latestSubscription.currentPeriodEnd as Date,
                        cancelAtPeriodEnd: latestSubscription.cancelAtPeriodEnd as boolean,
                        canceledAt: latestSubscription.canceledAt as Date,
                        organizationId: null,
                    },
                    error: isCanceled ? "Subscription has been canceled" : isExpired ? "Subscription has expired" : "Subscription is not active",
                    errorType: isCanceled ? "CANCELED" : isExpired ? "EXPIRED" : "GENERAL",
                };
            }

            return { hasSubscription: false };
        }

        return {
            hasSubscription: true,
            subscription: {
                id: activeSubscription.id as string,
                productId: activeSubscription.productId as string,
                status: activeSubscription.status as string,
                amount: parseInt(activeSubscription.amount as string),
                currency: activeSubscription.currency as string,
                recurringInterval: activeSubscription.recurringInterval as string,
                currentPeriodStart: activeSubscription.currentPeriodStart as Date,
                currentPeriodEnd: activeSubscription.currentPeriodEnd as Date,
                cancelAtPeriodEnd: activeSubscription.cancelAtPeriodEnd as boolean,
                canceledAt: activeSubscription.canceledAt as Date,
                organizationId: null,
            },
        };
    } catch (error) {
        console.error("Error fetching subscription details:", error);
        return {
            hasSubscription: false,
            error: "Failed to load subscription details",
            errorType: "GENERAL",
        };
    }
}

// Simple helper to check if user has an active subscription
export async function isUserSubscribed(): Promise<boolean> {
    const result = await getSubscriptionDetails();
    return result.hasSubscription && result.subscription?.status === "active";
}

// Helper to check if user has access to a specific product/tier
export async function hasAccessToProduct(productId: string): Promise<boolean> {
    const result = await getSubscriptionDetails();
    return (
        result.hasSubscription &&
        result.subscription?.status === "active" &&
        result.subscription?.productId === productId
    );
}

// Helper to get user's current subscription status
export async function getUserSubscriptionStatus(): Promise<"active" | "canceled" | "expired" | "none"> {
    const result = await getSubscriptionDetails();

    if (!result.hasSubscription) {
        return "none";
    }

    if (result.subscription?.status === "active") {
        return "active";
    }

    if (result.errorType === "CANCELED") {
        return "canceled";
    }

    if (result.errorType === "EXPIRED") {
        return "expired";
    }

    return "none";
}