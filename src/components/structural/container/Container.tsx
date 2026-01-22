import React from "react";
import {cn} from "@/lib/utils";

export const Container = (
    { children, className }:
    { children: React.ReactNode, className?: string }
) => {
    return (
        <div className={cn('mx-auto max-w-8xl xl:max-w-8xl px-8', className)}>
            {children}
        </div>
    );
};
