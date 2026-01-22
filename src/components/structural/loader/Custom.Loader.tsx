"use client";
import React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {LoaderPinwheel} from "lucide-react";

export const LoaderSkeleton = (
    {
        loadingMessage,
        additionalClassNames
    }: {
        loadingMessage: string;
        additionalClassNames: string;
    }
) => {

    return (
        <Skeleton className={`flex flex-col h-[250] ${additionalClassNames}`}>
            <div className={"text-center"}>
                <h1 className={"text-1xl m-4"}>
                    {loadingMessage}
                </h1>
            </div>
            <div className={"flex justify-center"}>
                <LoaderPinwheel
                    speed={1}
                    className={"animate-spin text-orange-400"}
                    size={"32px"}
                />
            </div>
        </Skeleton>
    )
}