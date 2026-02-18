import { getSubscriptionDetails } from "@/lib/subscription/subscription";

import PricingTable from "./_component/pricing-table";

async function PaymentsPage() {
    const subscriptionDetails = await getSubscriptionDetails();

    return (
        <div>
            <div className="flex flex-col w-full">
                <PricingTable subscriptionDetails={subscriptionDetails} />
            </div>
        </div>
    );
}

export default PaymentsPage;