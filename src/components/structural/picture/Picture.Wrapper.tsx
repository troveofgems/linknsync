"use client";
import Image, {StaticImageData} from "next/image";
import JiufenImgPlaceholder from "@/public/images/pexels-marek-piwnicki-3907296-27852891.jpg";

const
    DEFAULT_LOADING_TYPE = 'lazy',
    DEFAULT_WIDTH = 450,
    DEFAULT_HEIGHT = 400;

export const PictureWrapper = (
    {
        photo,
        staticImage,
        classNames = "",
        overrideLoadingType = DEFAULT_LOADING_TYPE,
        isSplashImg = false
    }:
    {
        photo?: {
            title?: string;
            srcUrl?: string;
            thumbnailUrl?: string;
            width: string;
            height: string;
        };
        staticImage?: StaticImageData;
        classNames?: string;
        overrideLoadingType?: "eager" | "lazy";
        isSplashImg?: boolean;
    }
) => {
    const
        renderProcessedPhoto = !!photo,
        renderStaticImageForSite = isSplashImg && !!staticImage;

    // Image Alt Text
    let alt = "";

    if(renderProcessedPhoto) {
        alt = `Image For: ${photo.title}`;
    } else if(renderStaticImageForSite) {
        alt = "Splash Image Hero";
    }

    if(renderProcessedPhoto) {
        return (
            <picture>
                <Image
                    src={photo.thumbnailUrl as string}
                    alt={alt}
                    width={parseInt(photo.width as string)}
                    height={parseInt(photo.height as string)}
                    className={classNames}
                    loading={overrideLoadingType}
                />
            </picture>
        );
    }
    else if (renderStaticImageForSite) {
        return (
            <picture>
                <Image
                    src={staticImage.src as string}
                    alt={alt}
                    width={staticImage.width}
                    height={staticImage.height}
                    className={classNames}
                    loading={overrideLoadingType}
                />
            </picture>
        );
    } else {
        return (
            <picture>
                <Image
                    src={JiufenImgPlaceholder}
                    alt={"Default LNS Image Placeholder of the Taiwanese City of Juifen"}
                    width={DEFAULT_WIDTH}
                    height={DEFAULT_HEIGHT}
                    className={classNames}
                    loading={overrideLoadingType}
                />
            </picture>
        );
    }
};