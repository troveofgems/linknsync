'use client';
import React, { FC } from 'react';

import { DropdownFieldType as DropdownField } from "@/components/forms/_elements/Inputs/SpecifiedTypes/Dropdown.Field.Type";
import { TextFieldType as TextField } from "@/components/forms/_elements/Inputs/SpecifiedTypes/Text.Field.Type";
import { CheckboxFieldType as CheckboxField } from "@/components/forms/_elements/Inputs/SpecifiedTypes/Checkbox.Field.Type";
import { FileUploadFieldType as FileUploadField } from "@/components/forms/_elements/Inputs/SpecifiedTypes/File.Upload.Field.Type";
import { DateTimeLocalFieldType as DateTimeLocalField } from "@/components/forms/_elements/Inputs/SpecifiedTypes/DateTimeLocal.Field.Type";
import { HiddenFieldType as HiddenField } from "@/components/forms/_elements/Inputs/SpecifiedTypes/Hidden.Field.Type";

interface TextInputProps {
    inputType?:
        "text" | "password" | "email" | "checkbox" | "radio" | "tel" | "date" | "time" | "number" |
        "datetime-local" | "range" | "url" | "file" | "image" | "color" | "month" | "week" |
        "button" | "submit" | "reset" | "search" | "hidden";
    useSubInputType?: boolean;
    setAsInputTextField?: boolean;
    setAsDropdown?: boolean;
    optionList?: {
        name: string;
        value: string;
    }[];
    setAsFileUpload?: boolean;
    accept?: string;
    setAsCheckbox?: boolean;
    defaultChecked?: boolean;
    setAsDateTimeLocal?: boolean;
    readOnly?: boolean;
    id: string;
    name: string;
    label?: string;
    showLabel?: boolean;
    showAsRequired?: boolean;
    placeholder?: string;
    defaultValue?: never | string | number | readonly string[] | undefined;
    value?: never | string | number | readonly string[] | undefined;
    isDecorativeField?: boolean;
    classNames?: string;
    containerClassnames?: string;
    inputFieldClassnames?: string;
    labelClassnames?: string;
    handleOnChange?:
        React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement> |
        React.Dispatch<React.SetStateAction<string>> |
        ((event: { target: { files: File[]; }; }) => void) | undefined;
    handleOnClick?:
        React.MouseEventHandler<HTMLInputElement> |
        ((event: React.MouseEventHandler<HTMLInputElement>) => void) | undefined;
    zodValidation?: string;
    fieldErrorMessage?: string;
    setAsHiddenField?: boolean;
}

export const GenericTextInput: FC<TextInputProps> = (
    {
        label = "Field Label",
        inputType = "text",
        showAsRequired = true,
        isDecorativeField = false,
        showLabel = true,
        placeholder = "Placeholder Text",
        id = "placeholder_id",
        name = "placeholder_name",
        containerClassnames = "flex flex-col w-full",
        readOnly = false,
        setAsDropdown = false,
        value = undefined,
        handleOnChange = undefined,
        handleOnClick = undefined,
        inputFieldClassnames = "",
        labelClassnames = "",
        optionList = [],
        fieldErrorMessage = undefined,
        defaultValue = undefined,
        setAsCheckbox = false,
        setAsInputTextField = false,
        setAsFileUpload = false,
        defaultChecked = false,
        accept,
        useSubInputType = false,
        setAsDateTimeLocal = false,
        setAsHiddenField = false,
    }) => {
    if(setAsInputTextField) {
        return (
            <TextField
                DEFAULT_INPUT_TYPE={inputType}
                useSubInputType={useSubInputType}
                name={name}
                id={id}
                label={label}
                showLabel={showLabel}
                showAsRequired={showAsRequired}
                containerClassnames={containerClassnames}
                labelClassnames={labelClassnames}
                additionalClassnames={inputFieldClassnames}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                readOnly={readOnly}
                onChangeHandler={handleOnChange as React.ChangeEventHandler<HTMLInputElement>}
                fieldErrorMessage={fieldErrorMessage}
                isDecorativeField={isDecorativeField}
            />
        )
    }
    if(setAsDropdown) {
        return (
            <DropdownField
                id={id}
                name={name}
                value={value as string}
                onChangeHandler={handleOnChange as React.ChangeEventHandler<HTMLSelectElement>}
                optionList={optionList}
                label={label}
                showLabel={showLabel}
                showAsRequired={showAsRequired}
                containerClassnames={containerClassnames}
                labelClassnames={labelClassnames}
                additionalClassnames={inputFieldClassnames}
            />
        );
    }
    if(setAsCheckbox) {
        return (
            <CheckboxField
                id={id}
                name={name}
                defaultChecked={defaultChecked}
                onClickHandler={handleOnClick as React.MouseEventHandler<HTMLInputElement>}
                label={label}
                showLabel={showLabel}
                showAsRequired={showAsRequired}
                containerClassnames={containerClassnames}
                labelClassnames={labelClassnames}
                additionalClassnames={inputFieldClassnames}
                readOnly={readOnly}
            />
        );
    }
    if(setAsFileUpload) {
        return (
            <FileUploadField
                id={id}
                name={name}
                label={label}
                showLabel={showLabel}
                showAsRequired={showAsRequired}
                onChangeHandler={handleOnChange as React.ChangeEventHandler<HTMLInputElement>}
                containerClassnames={containerClassnames}
                labelClassnames={labelClassnames}
                additionalClassnames={inputFieldClassnames}
                accept={accept}
                fieldErrorMessage={fieldErrorMessage}
            />
        )
    }
    if(setAsDateTimeLocal) {
        return (
            <DateTimeLocalField
                id={id}
                name={name}
                label={label}
                showLabel={showLabel}
                showAsRequired={showAsRequired}
                containerClassnames={containerClassnames}
                labelClassnames={labelClassnames}
                additionalClassnames={inputFieldClassnames}
                fieldErrorMessage={fieldErrorMessage as string}
            />
        );
    }
    if(setAsHiddenField) {
        return (
            <HiddenField
                id={id}
                name={name}
                label={label}
                value={value as string}
                containerClassnames={containerClassnames}
                labelClassnames={labelClassnames}
                additionalClassnames={inputFieldClassnames}
                fieldErrorMessage={fieldErrorMessage as string}
            />
        );
    }
};