"use client";
import React from "react";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";

export const BorderedPanel = (
    {
        divKey,
        title,
        titleClasses = "font-extrabold text-4xl my-8 text-blue-400",
        topSeparatorClasses = "mb-4",
        bottomSeparatorClasses = "mt-4",
        children
    }: {
        divKey: string;
        title: string;
        titleClasses?: string;
        topSeparatorClasses?: string;
        bottomSeparatorClasses?: string;
        children: React.ReactNode;
    }
) => {
    return (
        <div key={divKey}>
            <h3 className={titleClasses}>
                {title}
            </h3>
            <DropdownMenuSeparator className={topSeparatorClasses} />
            { children }
            <DropdownMenuSeparator className={bottomSeparatorClasses} />
        </div>
    )
}