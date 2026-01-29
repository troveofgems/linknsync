import {AdditionalListingAgent} from "@/app/(public-pages)/ourCustomers/sections/Additional.Listing.Agent";
import {ReferralListingAgent} from "@/app/(public-pages)/ourCustomers/sections/Referal.Listing.Agent";
import {PrimaryListingAgent} from "@/app/(public-pages)/ourCustomers/sections/Primary.Listing.Agent";
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";

const
    lastUpdate = new Date("1/28/2026")
        .toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }),
    PageLabel = "Short-Term Vacation Rental Property Managers";

const AboutPage = () => {
    return (
        <section key={"our-customers-page"} className={"mb-15"}>
            <h1 className={"lg:w-1/2 m-auto flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <h2 className={"lg:w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <PrimaryListingAgent />
            <AdditionalListingAgent />
            <ReferralListingAgent />
            <QuestionsOrConcerns />
        </section>
    );
}

export default AboutPage;