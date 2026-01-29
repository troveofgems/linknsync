import {HeroCarousel} from "@/components/misc/Hero/HeroCarousel";

export const Hero = () => {
    return (
        <section className={"grid grid-cols-1 lg:grid-cols-2 gap-24 items-center py-10"}>
            <div className={"flex w-full justify-center"}>
                <h1 className={"max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl letterSpace"}>
                    We are changing the way you view your ical events!
                </h1>
            </div>
            <HeroCarousel />
        </section>
    );
};
