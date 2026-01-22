import React from "react";
import { _InputFieldWrapper as InputFieldWrapper } from "@/components/forms/_elements/Inputs/_InputFieldWrapper";

export const FileUploadFieldType = (
    {
        FILE = "file",
        id,
        name,
        onChangeHandler = undefined,
        label,
        showLabel,
        showAsRequired,
        containerClassnames,
        labelClassnames,
        additionalClassnames,
        accept = "image/png, image/jpg, image/jpeg",
        fieldErrorMessage,
    }:
    {
        FILE?: string,
        id: string;
        name: string;
        onChangeHandler?: React.ChangeEventHandler<HTMLInputElement> | undefined;
        label: string;
        showLabel: boolean;
        showAsRequired: boolean;
        containerClassnames: string;
        labelClassnames: string;
        additionalClassnames: string;
        accept: string | undefined;
        fieldErrorMessage?: string;
        defaultValue?: File;
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
        <input
            type={FILE}
            id={id}
            name={name}
            onChange={onChangeHandler}
            className={`${additionalClassnames}`}
            required={showAsRequired}
            accept={accept}
        />
    </InputFieldWrapper>
);