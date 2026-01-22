import React from "react";
import { _InputFieldWrapper as InputFieldWrapper } from "@/components/forms/_elements/Inputs/_InputFieldWrapper";

export const DateTimeLocalFieldType = (
    {
        id,
        name,
        label,
        showLabel,
        showAsRequired,
        containerClassnames,
        labelClassnames,
        additionalClassnames,
        fieldErrorMessage,
    }:
    {
        id: string;
        name: string;
        label: string;
        showLabel: boolean;
        showAsRequired: boolean;
        containerClassnames: string;
        labelClassnames: string;
        additionalClassnames: string;
        fieldErrorMessage: string;
    }
) => (
    <InputFieldWrapper
        id={id}
        name={name}
        label={label}
        showLabel={showLabel}
        showAsRequired={showAsRequired}
        containerClassnames={containerClassnames}
        labelClassnames={labelClassnames}
        fieldErrorMessage={fieldErrorMessage}
    >
        {additionalClassnames}
    </InputFieldWrapper>
);