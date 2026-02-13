import {PurposeAndScope} from "@/app/(public-pages)/dataPolicy/sections/Purpose.Scope";
import {Encryption} from "@/app/(public-pages)/dataPolicy/sections/Encryption";
import {ControlOwnership} from "@/app/(public-pages)/dataPolicy/sections/Control.Ownership";
import {ThirdPartyTools} from "@/app/(public-pages)/dataPolicy/sections/Third.Party.Tools";
import {Retention} from "@/app/(public-pages)/dataPolicy/sections/Retention";
import {Enforcement} from "@/app/(public-pages)/dataPolicy/sections/Enforcement";
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {LAST_UPDATE__DATA_POLICY} from "@/constants/static.page.history.constants";

const PAGE_LABEL = "Data Policy";

const
    lastUpdate = new Date(LAST_UPDATE__DATA_POLICY)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const DataPolicyPage = () => (
    <section key={pageKey} className={"mb-15"}>
        <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
            {pageLabel}
        </h1>
        <h2 className={"lg:w-1/2 m-auto mt-5 flex flex-col"}>
            <span className={"font-bold"}>Last Revised</span> {lastUpdate}
        </h2>
        <PurposeAndScope pageKey={pageKey} sectionLabel={"Purpose and Scope"} />
        <Encryption pageKey={pageKey} sectionLabel={"Encryption At Rest"} />
        <ControlOwnership pageKey={pageKey} sectionLabel={"Control Ownership"} />
        <ThirdPartyTools pageKey={pageKey} sectionLabel={"Third Party Tools"} />
        <Retention pageKey={pageKey} sectionLabel={"Retention"} />
        <Enforcement pageKey={pageKey} sectionLabel={"Enforcement"} />
        <QuestionsOrConcerns pageKey={pageKey} sectionLabel={"Questions Or Concerns"} />
    </section>
);

export default DataPolicyPage;