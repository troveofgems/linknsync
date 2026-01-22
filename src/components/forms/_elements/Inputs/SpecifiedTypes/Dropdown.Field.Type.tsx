import React from "react";
import { _InputFieldWrapper as InputFieldWrapper } from "@/components/forms/_elements/Inputs/_InputFieldWrapper";

export const DropdownFieldType = (
    {
        id,
        name,
        value,
        defaultValue,
        onChangeHandler,
        optionList,
        label,
        showLabel,
        showAsRequired,
        containerClassnames,
        labelClassnames,
        additionalClassnames = "w-fit formInputDropdown",
    }:
    {
        id: string;
        name: string;
        value?: string | undefined;
        defaultValue?: string | undefined;
        onChangeHandler: React.ChangeEventHandler<HTMLSelectElement> | undefined;
        optionList: {
            name: string;
            value: string;
        }[];
        label: string;
        showLabel: boolean;
        showAsRequired: boolean;
        containerClassnames: string;
        labelClassnames: string;
        additionalClassnames: string;
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
        <select
            id={id}
            name={name}
            defaultValue={defaultValue}
            value={value}
            onChange={onChangeHandler}
            className={`mb-2 ${additionalClassnames}`}
        >
            {
                optionList.map((option: { name: string, value: string }, index: number) => (
                    <option
                        value={option.value}
                        key={`option_${option.name}_${index}`}
                    >
                        {option.name}
                    </option>
                ))
            }
        </select>
    </InputFieldWrapper>
);