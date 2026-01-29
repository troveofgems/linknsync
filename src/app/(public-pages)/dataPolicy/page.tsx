import {PurposeScope} from "@/app/(public-pages)/dataPolicy/sections/Purpose.Scope";
import {Encryption} from "@/app/(public-pages)/dataPolicy/sections/Encryption";
import {ControlOwnership} from "@/app/(public-pages)/dataPolicy/sections/Control.Ownership";
import {ThirdPartyTools} from "@/app/(public-pages)/dataPolicy/sections/Third.Party.Tools";
import {Retention} from "@/app/(public-pages)/dataPolicy/sections/Retention";
import {Enforcement} from "@/app/(public-pages)/dataPolicy/sections/Enforcement";

const lastUpdate = new Date("1/28/2026")
    .toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    PageLabel = "Data Policy";

const DataPolicyPage = () => {
    return (
        <section key={"data-policy-page"} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <PurposeScope />
            <Encryption />
            <ControlOwnership />
            <ThirdPartyTools />
            <Retention />
            <Enforcement />
            <h2 className={"w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
                <div className={"mt-5"}>
                    <span className={"font-bold"}>
                    Questions or concerns?
                </span> Reading this Data Policy will help you
                    understand your privacy rights and choices. We are responsible for making decisions about how your personal
                    information is processed. If you do not agree with our policies and practices please do not use our Services.
                    If you still have any questions or concerns please contact us at <a href={"mailto:linknsyncdev@gmail.com"} className={"staticPageLink"}>linknsyncdev@gmail.com</a>
                </div>
            </h2>
        </section>
    );
};

export default DataPolicyPage;