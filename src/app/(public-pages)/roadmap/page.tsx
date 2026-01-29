import {BetaVersion} from "@/app/(public-pages)/roadmap/sections/Beta";
import {Version1} from "@/app/(public-pages)/roadmap/sections/Version1";
import {QuestionsOrConcerns} from "@/components/pages/questions-or-conerns/QuestionsOrConcerns";
import {Version2} from "@/app/(public-pages)/roadmap/sections/Version2";

const PageLabel = "Our Future Roadmap";

const FutureRoadMapPage = () => {
    return (
        <section className={"futureRoadmap-section"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <BetaVersion />
            <Version1 />
            <Version2 />
            <QuestionsOrConcerns />
        </section>
    );
}

export default FutureRoadMapPage;