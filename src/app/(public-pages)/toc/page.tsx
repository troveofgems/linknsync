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
    PageLabel = "Terms and Conditions";

function ToCPage() {
    return (
        <section className={"toc-section"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <h2 className={"lg:w-1/2 lg:m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
            </h2>
            <QuestionsOrConcerns />
        </section>
    );
}

export default ToCPage;