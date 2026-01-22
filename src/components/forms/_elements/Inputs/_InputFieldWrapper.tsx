import React from "react";
import RequiredFieldAsterisk from "@/components/misc/RequiredFieldAsterisk";

export const _InputFieldWrapper = (
    {
        id,
        showLabel = true,
        label,
        showAsRequired,
        containerClassnames,
        labelClassnames,
        fieldErrorMessage,
        children
    }:
    {
        id: string;
        name: string;
        showLabel: boolean;
        label: string;
        showAsRequired: boolean;
        containerClassnames?: string;
        labelClassnames?: string;
        fieldErrorMessage: unknown;
        children?: React.ReactNode;
    }
) => (
    <div className={containerClassnames}>
        <label htmlFor={id} className={`my-1 text-muted-foreground ${labelClassnames}`}>
            {showLabel && (label)} { (showAsRequired) && (<RequiredFieldAsterisk />)}
        </label>
        {children}
        {
            !!fieldErrorMessage && (
                <small className={"text-red-500 wrap-normal my-3"}>
                    Error ={">"}{" "}
                    {
                        JSON
                            .stringify(fieldErrorMessage)
                            .replaceAll("\"", "")
                    }
                </small>
            )
        }
    </div>
);