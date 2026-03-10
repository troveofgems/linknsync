"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {ExternalLink} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import {SessionDataState} from "@/store/userStore";
import {
    fetchMinimalPropertyByIdTileInfoAction,
    ReadPropertyActionState,
    ReadPropertyByIdParams
} from "@/actions/property/read.action";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {formatAddress, SupportedCountries} from "@/lib/utils/Address/address.utils";
import {Address, Photo} from "@prisma/client";

type PropertyViewProps = {
    id: string;
    name: string;
    homepageLink: string;
    Address?: Address;
    Photo?: Partial<Photo> | null;
}

export const PropertyView = ({
    pid,
    user
}: {
    pid: string;
    user: SessionDataState;
}) => {
    const
        [loadingProperty, setLoadingProperty] = useState(true),
        [property, setProperty] = useState<PropertyViewProps>({} as PropertyViewProps);

    useEffect(() => {
        if(loadingProperty) {
            fetchMinimalPropertyByIdTileInfoAction(
                { pState: user } as ReadPropertyActionState,
                {
                    propertyId: pid,
                } as ReadPropertyByIdParams
            ).then((result) => {
                setProperty(result.response.propertyById as PropertyViewProps);
                setLoadingProperty(false);
            })
        }
    }, [loadingProperty, pid, user]);

    return (
        <>
            {
                loadingProperty && (
                    <LoaderSkeleton
                        loadingMessage={"Loading Property Data..."}
                        additionalClassNames={"ml-15 mb-10"}
                    />
                )
            }
            {
                !loadingProperty &&
                !!property &&
                (
                    <div className={"flex w-full flex-col justify-between mb-8 h-fit"}>
                        <div className={"mb-8 w-[60%]"}>
                            <Card className={"w-full alignContentCenter"}>
                                <CardContent>
                                    <PictureWrapper
                                        photo={!!property.Photo ? {
                                            thumbnailUrl: property.Photo.srcUrl ?? property.Photo.thumbnailUrl,
                                            width: property.Photo.width,
                                            height: property.Photo.height,
                                            title: property.Photo.title
                                        } : undefined}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                        <div className={"w-2/5"}>
                            <h1 className={"text-3xl text-start flex flex-row mb-5"}>
                                { property.name }
                                <span className={"px-2"}>
                                {
                                    (
                                        !!property.homepageLink &&
                                        property.homepageLink.length > 0
                                    ) ? (
                                        <Link
                                            href={property.homepageLink}
                                            target="_blank"
                                            className={"tableRowData tableRowDataLink w-fit"}>
                                            <ExternalLink />
                                        </Link>
                                    ) : null
                                }
                            </span>
                            </h1>
                            <span className={"mt-5 inline text-muted-foreground text-[20px] align-middle"}>
                                    <small>{`${property!.Address?.isMUA ? "Multi-Unit Location" : "Single Unit Location"}`}</small>
                            </span>
                            <pre className={"text-1xl"}>
                                {
                                    formatAddress({
                                        isMUA: property!.Address!.isMUA,
                                        street: property!.Address!.street,
                                        street2: property!.Address!.street2,
                                        street3: property!.Address!.street3,
                                        city: property!.Address!.city,
                                        state: property!.Address!.state,
                                        postalCode: property!.Address!.postalCode,
                                        country: property!.Address!.country as SupportedCountries
                                    })
                                }
                            </pre>
                        </div>
                    </div>
                )
            }
        </>
    );
}
