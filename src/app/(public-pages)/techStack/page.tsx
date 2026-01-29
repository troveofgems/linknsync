import {FrontEnd} from "@/app/(public-pages)/techStack/sections/Front.End";
import {BackEnd} from "@/app/(public-pages)/techStack/sections/Back.End";

const
    lastUpdate = new Date("1/28/2026")
        .toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }),
    PageLabel = "Technology Stack";

const TechStackPage = () => {

    return (
        <section key={"tech-stack-page"} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <h2 className={"w-1/2 m-auto mt-5 flex flex-col"}>
                <span className={"font-bold"}>Last Revised</span> {lastUpdate}
                <div className={"mt-5"}>
                    <span className={"font-bold"}>
                    Questions or concerns?
                </span> Reading the Tech Stack will help you understand the tools being used by this system. We are
                    responsible for making decisions about how your personal information is processed. If you do not
                    agree with our policies and practices please do not use our Services. If you still have any
                    questions or concerns please contact us at
                    <a href={"mailto:linknsyncdev@gmail.com"} className={"link"}>
                        linknsyncdev@gmail.com
                    </a>
                </div>
            </h2>
            <FrontEnd />
            <BackEnd />
        </section>
    );
}

export default TechStackPage;