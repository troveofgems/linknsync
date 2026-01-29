import {PricingCards} from "@/components/misc/PricingCards/PricingCards";
import {FreeOption} from "@/app/(public-pages)/pricing/sections/Free";
import {EnterpriseOption} from "@/app/(public-pages)/pricing/sections/Enterprise";
import {ProOption} from "@/app/(public-pages)/pricing/sections/Pro";

const PageLabel = "Our Pricing Plans";

const PricingPage = () => {
    return (
        <section className={"about-section"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <FreeOption />
            <ProOption />
            <EnterpriseOption />
            <PricingCards />
        </section>
    );
};

export default PricingPage;