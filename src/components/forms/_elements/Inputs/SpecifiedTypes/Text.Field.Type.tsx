import React from "react";
import { _InputFieldWrapper as InputFieldWrapper } from "@/components/forms/_elements/Inputs/_InputFieldWrapper";

const DEFAULT_FIELD_CHAR_LIMIT = 250;

export const TextFieldType = (
    {
        DEFAULT_INPUT_TYPE = "text",
        id,
        inputTypeOverride,
        name,
        value,
        defaultValue,
        placeholder,
        showLabel = true,
        label,
        showAsRequired = true,
        readOnly = false,
        containerClassnames,
        labelClassnames,
        additionalClassnames,
        isDecorativeField = false,
        onChangeHandler,
        useSubInputType = false,
        maxLength = DEFAULT_FIELD_CHAR_LIMIT,
        fieldErrorMessage,
    }:
    {
        DEFAULT_INPUT_TYPE: string;
        inputTypeOverride?: string;
        id: string;
        name: string;
        placeholder: string;
        showLabel: boolean;
        label: string;
        value?: string | number | readonly string[] | undefined;
        defaultValue?: string | number | readonly string[] | undefined;
        readOnly: boolean;
        showAsRequired: boolean;
        containerClassnames?: string;
        labelClassnames?: string;
        additionalClassnames?: string;
        isDecorativeField: boolean;
        onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
        useSubInputType?: boolean;
        maxLength?: number;
        fieldErrorMessage?: string;
    }
) => (
    <InputFieldWrapper
        id={id}
        name={name}
        label={label}
        showLabel={showLabel}
        showAsRequired={(!isDecorativeField && showAsRequired)}
        containerClassnames={containerClassnames}
        labelClassnames={labelClassnames}
        fieldErrorMessage={fieldErrorMessage}
    >
        {
            isDecorativeField ? <></> : (
                <input
                    className={`${additionalClassnames}`}
                    readOnly={readOnly}
                    defaultValue={defaultValue}
                    value={value}
                    type={useSubInputType ? inputTypeOverride : DEFAULT_INPUT_TYPE}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    required={showAsRequired}
                    onChange={onChangeHandler}
                    autoComplete={"off"}
                    data-1p-ignore
                    data-lpignore={"true"}
                    data-protonpass-ignore={"true"}
                    data-bwignore
                    data-nonce={"no-nonce"}
                    data-form-type="other"
                    maxLength={maxLength}
                />
            )
        }
    </InputFieldWrapper>
);