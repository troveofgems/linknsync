import {PurposeScope} from "@/app/(public-pages)/dataPolicy/sections/Purpose.Scope";
import {Encryption} from "@/app/(public-pages)/dataPolicy/sections/Encryption";
import {ControlOwnership} from "@/app/(public-pages)/dataPolicy/sections/Control.Ownership";
import {ThirdPartyTools} from "@/app/(public-pages)/dataPolicy/sections/Third.Party.Tools";
import {Retention} from "@/app/(public-pages)/dataPolicy/sections/Retention";
import {Enforcement} from "@/app/(public-pages)/dataPolicy/sections/Enforcement";
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";

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
            <h2 className={"lg:w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <PurposeScope />
            <Encryption />
            <ControlOwnership />
            <ThirdPartyTools />
            <Retention />
            <Enforcement />
            <QuestionsOrConcerns />
        </section>
    );
};

export default DataPolicyPage;