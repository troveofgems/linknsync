import {PricingCards} from "@/components/misc/PricingCards/PricingCards";

const PricingPage = () => {
    return (
        <section className={"about-section"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                Our Pricing Plans
            </h1>
            <PricingCards />
        </section>
    );
};

export default PricingPage;