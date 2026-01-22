import React from "react";
import { _InputFieldWrapper as InputFieldWrapper } from "@/components/forms/_elements/Inputs/_InputFieldWrapper";

export const HiddenFieldType = (
    {
        DEFAULT_INPUT_TYPE = "hidden",
        id,
        name,
        label,
        containerClassnames,
        labelClassnames,
        fieldErrorMessage,

        placeholder,
        value
    }:
    {
        DEFAULT_INPUT_TYPE?: string,
        id: string;
        name: string;
        label: string;
        containerClassnames: string;
        labelClassnames: string;
        additionalClassnames: string;
        fieldErrorMessage: string;

        placeholder?: string;
        value?: string;
    }
) => (
    <InputFieldWrapper
        id={id}
        name={name}
        label={label}
        showLabel={false}
        showAsRequired={false}
        containerClassnames={containerClassnames}
        labelClassnames={labelClassnames}
        fieldErrorMessage={fieldErrorMessage}
    >
        <input
            readOnly={true}
            value={value ?? ""}
            type={DEFAULT_INPUT_TYPE}
            placeholder={placeholder}
            id={id}
            name={name}
            required={true}
            autoComplete={"off"}
            data-1p-ignore
            data-lpignore={"true"}
            data-protonpass-ignore={"true"}
            data-bwignore
            data-nonce={"no-nonce"}
            data-form-type="other"
        />
    </InputFieldWrapper>
);