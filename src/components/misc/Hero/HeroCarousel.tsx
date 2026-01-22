import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

import {
    Card, CardContent,
} from "@/components/ui/card";

import HeroImage2 from "@/public/images/jung-japan-2025.jpg";
import HeroImage1 from "@/public/images/pexels-thngocbich-760710.jpg";
import HeroImage3 from "@/public/images/pexels-marek-piwnicki-3907296-27852891.jpg";

import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";

export const HeroCarousel = () => {
    const imageList = [HeroImage1, HeroImage2, HeroImage3];
    return (
        <div className={"hidden lg:block w-3/4"}>
            <Carousel>
                <CarouselContent>
                    {imageList.map((image, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className={"p-2"}>
                                    <PictureWrapper
                                        staticImage={image}
                                        classNames={"w-full h-[24rem] rounded-md object-cover"}
                                        isSplashImg={true}
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};
