import React from "react";
import { _InputFieldWrapper as InputFieldWrapper } from "@/components/forms/_elements/Inputs/_InputFieldWrapper";

export const CheckboxFieldType = (
    {
        CHECKBOX = "checkbox",
        id,
        name,
        defaultChecked,
        onClickHandler,
        label,
        showLabel,
        showAsRequired,
        containerClassnames,
        labelClassnames,
        additionalClassnames,
        readOnly = false
    }:
    {
        CHECKBOX?: string,
        id: string;
        name: string;
        defaultChecked?: boolean;
        onClickHandler?: React.MouseEventHandler<HTMLInputElement> | undefined;
        label: string;
        showLabel: boolean;
        showAsRequired: boolean;
        containerClassnames: string;
        labelClassnames: string;
        additionalClassnames: string;
        readOnly?: boolean;
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
        fieldErrorMessage={undefined}
    >
        <input
            type={CHECKBOX}
            id={id}
            name={name}
            defaultChecked={defaultChecked}
            onClick={onClickHandler}
            className={`mb-2 ${additionalClassnames}`}
            required={showAsRequired}
            data-1p-ignore
            data-lpignore={"true"}
            data-protonpass-ignore={"true"}
            data-bwignore
            data-form-type="other"
            inert={readOnly}
        />
    </InputFieldWrapper>
);