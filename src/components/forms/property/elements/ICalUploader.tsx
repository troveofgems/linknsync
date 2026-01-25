"use client";
import React, {useState} from "react";

import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";

// Cron Connected ICal Source Icon
import { TbActivityHeartbeat } from "react-icons/tb";
import {GiCrystalGrowth} from "react-icons/gi";

import {
    TEXT_BLOCK__DYNAMIC_URL_UPLOAD_MESSAGE, TEXT_BLOCK__STATIC_FILE_UPLOAD_MESSAGE,
    TEXT_BLOCK__WARNING_MESSAGE
} from "@/constants/SiteContent/TextBlocks.constants";
import {CreatePropertyActionState} from "@/actions/property/create.action";
import {UpdatePropertyActionState} from "@/actions/property/update.action";
import {CreateICalAttachmentActionState} from "@/actions/ical/create.action";
import {UpdateICalActionState} from "@/actions/ical/update.action";

interface ICalImportOptions {
    value: string;
    name: string;
}
const icalImportOptions: ICalImportOptions[] = [
    {
        value: "link",
        name: "URL"
    },
    {
        value: "file",
        name: "Upload",
    }
];

export const ICalUploader = (
    {
        formState,
        containerClassnames,
        labelClassnames,
        inputFieldClassnames,
    }: {
        formState:
            CreatePropertyActionState |
            UpdatePropertyActionState |
            CreateICalAttachmentActionState |
            UpdateICalActionState;
        containerClassnames: string;
        labelClassnames: string;
        inputFieldClassnames?: string;
    }
) => {
    const
        [icalImportType, setIcalImportType] = useState("link"),
        handleImportTypeChange = (evt: { target: { value: React.SetStateAction<string>; }; }) => {
            setIcalImportType(evt.target.value);
        };

    return (
        <div>
            <div id="icalUploader" className={`w-full flex ${containerClassnames}`}>
                <div className={`flex flex-row ${labelClassnames}`}>
                    <div>
                        <GenericTextInput
                            setAsDropdown={true}
                            label={"Import Type"}
                            showAsRequired={true}
                            name={"ical.importType"}
                            id={"ical.importType"}
                            optionList={icalImportOptions}
                            value={icalImportType}
                            handleOnChange={handleImportTypeChange}
                            labelClassnames={"formLabel mt-0"}
                            inputFieldClassnames={"formInput w-fit"}
                        />
                    </div>
                    <div className={`px-4 w-3/4 m-auto mt-7`}>
                        {
                            icalImportType === "link" && (
                                <div className={"w-full m-auto"}>
                                    <p>
                                            <span className={"text-green-700 text-3xl"}>
                                                <TbActivityHeartbeat key={`dynamic_resource_hb_icon`} />
                                            </span>
                                        <span className={"text-muted-foreground"}>
                                                {TEXT_BLOCK__DYNAMIC_URL_UPLOAD_MESSAGE}
                                            </span>
                                    </p>
                                </div>
                            )
                        }
                        {
                            icalImportType === "file" && (
                                <div className={"w-full"}>
                                    <p>
                                            <span className={"text-red-700 text-3xl"}>
                                                <GiCrystalGrowth key={`static_resource_crystal_icon`} />
                                            </span>
                                        <span className={"text-destructive pr-2"}>
                                                {TEXT_BLOCK__WARNING_MESSAGE}
                                            </span>
                                        <span className={"text-muted-foreground"}>
                                                {TEXT_BLOCK__STATIC_FILE_UPLOAD_MESSAGE}
                                            </span>
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={`${inputFieldClassnames}`}>
                    {
                        icalImportType === "link" ? (
                            <>
                                <GenericTextInput
                                    setAsInputTextField={true}
                                    useSubInputType={true}
                                    inputType={"url"}
                                    label={"ICal URL"}
                                    showAsRequired={true}
                                    placeholder={"https://pm.thetroveofgems.tech/property/somePID/ical.ics"}
                                    name={"ical.href"}
                                    id={"ical.href"}
                                    defaultValue={(!!formState?.response?.formData) ? `${formState.response.formData!.get("ical.href")}` : ""}
                                    labelClassnames={"formLabel"}
                                    inputFieldClassnames={"formInput w-fit"}
                                    fieldErrorMessage={(!!formState?.errors?.icalSource) ? formState.errors.icalSource!.join("\n") : undefined}
                                />
                            </>
                        ) : (
                            <GenericTextInput
                                setAsFileUpload={true}
                                accept={"text/calendar"}
                                label={"ICal File Upload"}
                                showAsRequired={true}
                                name={"ical.file"}
                                id={"ical.file"}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput uploadFit"}
                                fieldErrorMessage={!!formState?.errors?.icalSource ? formState.errors.icalSource.join("\n") : undefined}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}