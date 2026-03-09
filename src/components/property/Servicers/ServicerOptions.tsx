"use client";
import React, {useState} from "react";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";

import TrackLogo from "@/public/images/travelnet_solutions_logo.png";
import Image from "next/image";

export const ServicerOptions = (
    {
        connected = false,
        unitId
    }: {
        connected?: boolean;
        unitId?: string;
    }
) => {
    const [showTrackUnitId, setShowTrackUnitId] = useState(connected);

    const handleConnectToServicerClick = () => {
        setShowTrackUnitId(!showTrackUnitId);
    };

    return (
        <div className={"flex flex-col w-full justify-start-safe"}>
            <div className={"flex flex-row justify-start"}>
                <div key={"servicerOptions"} className={"flex flex-row alignContentCenter"}>
                    <div className={"mr-5"}>
                        <Image src={TrackLogo} alt={"TNS Logo"} width={50} height={50} />
                    </div>
                    <GenericTextInput
                        setAsCheckbox={true}
                        showAsRequired={false}
                        id={"property.servicer.tns.connected"}
                        name={"property.servicer.tns.connected"}
                        defaultChecked={connected}
                        handleOnClick={handleConnectToServicerClick}
                        containerClassnames={"flex flex-row mt-2 alignContentCenter"}
                        labelClassnames={"formLabel formCheckboxLabel alignContentCenter"}
                        inputFieldClassnames={"formInput formCheckbox"}
                        label={"Sync Calendar Updates To Track (PUSH)"}
                    />
                </div>
                <div className={"flex flex-col justify-end-safe text-end pl-4 w-[280px]"}>
                    {
                        showTrackUnitId && (
                            <GenericTextInput
                                setAsInputTextField={true}
                                showAsRequired={true}
                                id={"property.servicer.tns.unitId"}
                                name={"property.servicer.tns.unitId"}
                                defaultValue={unitId ?? ""}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput text-end"}
                                placeholder={"Track Unit Id"}
                                label={"Track Unit Id"}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}