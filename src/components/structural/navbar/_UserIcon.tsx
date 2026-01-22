"use client";
import {LuTriangleAlert, LuUser} from "react-icons/lu";
import {useUserStore} from "@/store/userStore";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";

export const UserIcon = () => {
    const { user: { isLoading, isAuthenticated, attrs, error } } = useUserStore();

    if(!isLoading && isAuthenticated) {
        return (
            <PictureWrapper
                photo={!!attrs?.profile?.imageUrl ? {
                    thumbnailUrl: attrs?.profile?.imageUrl as string,
                    height: "25",
                    width: "25",
                    title: "User Avatar"
                } : undefined}
            />
        );
    } else if (isLoading || !isAuthenticated) {
        return (
            <LuUser className={"w-6 h-6 bg-primary rounded-full text-white"}/>
        );
    } else if (!!error) {
        return (
            <LuTriangleAlert className={"w-6 h-6 text-red-500"}/>
        )
    }
};