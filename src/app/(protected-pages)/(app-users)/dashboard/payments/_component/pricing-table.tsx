"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { toast } from "sonner";
import {useUserStore} from "@/store/userStore";
/*import { useRouter } from "next/navigation";
import { useState } from "react";*/

type SubscriptionDetails = {
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

type SubscriptionDetailsResult = {
    hasSubscription: boolean;
    subscription?: SubscriptionDetails;
    error?: string;
    errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

interface PricingTableProps {
    subscriptionDetails: SubscriptionDetailsResult;
}

export default function PricingTable(
    {
        subscriptionDetails
    }: PricingTableProps
) {
    //const router = useRouter();
    const { user: { attrs } } = useUserStore();

    const handleCheckout = async (productId: string, slug: string) => {
        if(process.env.NODE_ENV === "development") {
            console.warn("Handle Checkout with product id and slug", productId, slug, attrs);
        }
        try {
            window.location.href = `/api/checkout?products=aa87ce1c-7af1-45a2-95be-427066a89e8a`;
        } catch (error) {
            console.error("Checkout failed:", error);
            // TODO: Add user-facing error notification
            toast.error("We were unable to complete your purchase with Polar...");
        }
    };

   /* const handleManageSubscription = async () => {
        try {
            await authClient.customer.portal();
        } catch (error) {
            console.error("Failed to open customer portal:", error);
            toast.error("Failed to open subscription management");
        }
    };*/

    const STARTER_TIER = process.env.NEXT_PUBLIC_STARTER_TIER;
    const STARTER_SLUG = process.env.NEXT_PUBLIC_STARTER_SLUG;

    if (!STARTER_TIER || !STARTER_SLUG) {
        throw new Error("Missing required environment variables for Starter tier");
    }

    const isCurrentPlan = (tierProductId: string) => {
        return (
            subscriptionDetails.hasSubscription &&
            subscriptionDetails.subscription?.productId === tierProductId &&
            subscriptionDetails.subscription?.status === "active"
        );
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <section className="flex flex-col w-full">
            <div className="mb-12">
                <h1 className="text-4xl font-medium tracking-tight mb-4">
                    Begin Your Subscription
                </h1>
                <p className="text-xl text-muted-foreground">
                    Subscribe to Pro with Link-N-Sync!
                </p>
            </div>
            <div className="max-w-2xl w-1/3">
                <Card className="relative h-fit">
                    {isCurrentPlan(STARTER_TIER) && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800"
                            >
                                Current Plan
                            </Badge>
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-2xl">{STARTER_TIER}</CardTitle>
                        <CardDescription>Perfect for adding more Properties and ICal Links to your Account</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">$50</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>50 Properties</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>10 ICals Per Property</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>Hourly Syncs</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>Prioritized Email Support</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {isCurrentPlan(STARTER_TIER) ? (
                            <div className="w-full space-y-2">
                                <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={() => {}/*handleManageSubscription*/}
                                >
                                    Manage Subscription
                                </Button>
                                {subscriptionDetails.subscription && (
                                    <p className="text-sm text-muted-foreground text-center">
                                        {subscriptionDetails.subscription.cancelAtPeriodEnd
                                            ? `Expires ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`
                                            : `Renews ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <Button
                                className="w-full"
                                disabled={true}
                                onClick={() => handleCheckout(STARTER_TIER, STARTER_SLUG)}
                            >
                                Get Started
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-12">
                <p className="text-muted-foreground">
                    Need an Enterprise Plan?{" "}
                    <span className="text-primary cursor-pointer hover:underline">
                         Please Contact us
                    </span>
                </p>
            </div>
        </section>
    )
}