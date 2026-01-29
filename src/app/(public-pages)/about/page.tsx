import {
    StaticPageContent,
    PageContent,
    printSection,
    StaticPageAlignment
} from "@/lib/utils/StaticPageContent/StaticPageContent.utils";
import {Card, CardContent} from "@/components/ui/card";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import BrettAndDustin from "@/public/images/brettanddustin.jpg";

const
    PageLabel = "About Us",
    pageContents: StaticPageContent = [
        {
            key: "About Us",
            label: "Who are we?",
            verbiage: "Link-N-Sync is the product of Brett Wright and Dustin Greco. We are a couple living in Arizona. " +
                "Brett has a passion for the Vacation Rental Industry and Dustin is an avid programmer. We have our four " +
                "pets: Bailey, Mister, Vandal, and Louie; they're a handful and keep us busy!"
        }
    ];

const AboutPage = () => {
    return (
        <section key={"about-page"} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                {PageLabel}
            </h1>
            <div className={StaticPageAlignment}>
                {
                    pageContents.map((pageContent: PageContent) => printSection(pageContent))
                }
                <Card className={"w-fit m-auto mt-5"}>
                    <CardContent className={"w m-auto"}>
                        <PictureWrapper
                            staticImage={BrettAndDustin}
                            classNames={" h-[32rem] rounded-md object-cover flex items-center"}
                            isSplashImg={true}
                        />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default AboutPage;