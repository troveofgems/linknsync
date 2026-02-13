import {PricingCards} from "@/components/misc/PricingCards/PricingCards";
import {FreeOption} from "@/app/(public-pages)/pricing/sections/Free";
import {EnterpriseOption} from "@/app/(public-pages)/pricing/sections/Enterprise";
import {ProOption} from "@/app/(public-pages)/pricing/sections/Pro";
import {LAST_UPDATE__PRICING} from "@/constants/static.page.history.constants";

const PAGE_LABEL = "Our Pricing Plans";

const
    lastUpdate = new Date(LAST_UPDATE__PRICING)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const PricingPage = () => (
    <section key={pageKey} className={"pricing-section"}>
        <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
            {pageLabel}
        </h1>
        <h2 className={"lg:w-1/2 m-auto mt-5 flex flex-col"}>
            <span className={"font-bold"}>Last Revised</span> {lastUpdate}
        </h2>
        <FreeOption pageKey={pageKey} sectionLabel={"Free Plan"} />
        <ProOption pageKey={pageKey} sectionLabel={"Pro Plan"} />
        <EnterpriseOption pageKey={pageKey} sectionLabel={"Enterprise Plan"} />
        <PricingCards />
    </section>
);

export default PricingPage;