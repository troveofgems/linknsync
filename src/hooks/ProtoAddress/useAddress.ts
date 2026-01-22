"use client";
import React, { useState } from 'react';

// Default Country: USA
import {getUSACitiesByState, LOUISIANA_PARISHES, USA_STATES} from "@/constants/Address/Countries/USA_States_and_Cities";

// Australia
import {
    AUSTRALIAN_STATES_AND_TERRITORIES,
    getAustralianCitiesByStateOrTerritory
} from "@/constants/Address/Countries/AUS_States_and_Cities";

// Canada
import {
    CANADIAN_PROVINCES_AND_TERRITORIES,
    getCanadianCitiesByProvinceOrTerritory
} from "@/constants/Address/Countries/CAN_States_and_Cities";

// Cayman Islands
import {
    CAYMAN_DISTRICTS,
    getCaymanDistrictsByArea
} from "@/constants/Address/Countries/CYM_States_and_Cities";

// United Kingdom
import {
    GBR_STATES_AND_TERRITORIES,
    getGBRCitiesByStateOrTerritory
} from "@/constants/Address/Countries/GBR_States_and_Cities";

// Mexico
import {
    getMexicanCitiesByState,
    MEXICAN_STATES
} from "@/constants/Address/Countries/MEX_States_and_Cities";

// All Countries Supported By App
import {getCountryList} from "@/lib/utils/Address/address.utils";
import {SupportedCountries} from "@prisma/client";

export interface UserInputAddress {
    street: string;
    street2?: string;
    street3?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface ProtoAddressProps {
    defaults: {
        supportedCountries: object[];
        country: SupportedCountries;
        stateList: {name: string; value: string;}[];
        stateCode: string;
        stateName: string;
        cityList: { name: string; value: string; }[];
        cityCode: string;
        cityName: string;
        customCity?: string | null;
        locationNotListed: boolean;
        street?: string;
        street2?: string | null;
        street3?: string | null;
        postalCode: string;
        showParishes: boolean;
        parishCode?: string | null;
        parishName?: string | null;
        parishList?: { name: string; value: string; }[] | null;
        isMUA: boolean;
    },
    userInputs: {
        country?: SupportedCountries | string | null;
        stateList?: {name: string; value: string;}[] | null;
        stateCode?: string | null;
        stateName?: string | null;
        cityList?: { name: string; value: string; }[] | null,
        cityCode?: string | null;
        cityName?: string | null;
        customCity?: string | null,
        locationNotListed?: boolean,
        street?: string | null;
        street2?: string | null;
        street3?: string | null;
        postalCode?: string | null;
        showParishes: boolean;
        parishCode?: string | null;
        parishName?: string | null;
        parishList?: { name: string; value: string; }[] | null;
        isMUA: boolean;
    }
}

const GENERIC_NOT_FOUND_LABEL = "Not Found";

const getStateListForCountry = (
    country: SupportedCountries
) => {
    switch (country) {
        case SupportedCountries.AUS:
            return AUSTRALIAN_STATES_AND_TERRITORIES;
        case SupportedCountries.CAN:
            return CANADIAN_PROVINCES_AND_TERRITORIES;
        case SupportedCountries.CYM:
            return CAYMAN_DISTRICTS;
        case SupportedCountries.GBR:
            return GBR_STATES_AND_TERRITORIES;
        case SupportedCountries.MEX:
            return MEXICAN_STATES;
        case SupportedCountries.USA:
            return USA_STATES;
        default:
            return [];
    }
}

const getStateFullName = (
    country: SupportedCountries,
    stateCode: string
) => {
    let fullName: string;
    switch (country) {
        case SupportedCountries.AUS:
            fullName = searchForStateName(stateCode, AUSTRALIAN_STATES_AND_TERRITORIES);
            break;
        case SupportedCountries.CAN:
            fullName = searchForStateName(stateCode, CANADIAN_PROVINCES_AND_TERRITORIES);
            break;
        case SupportedCountries.CYM:
            fullName = searchForStateName(stateCode, CAYMAN_DISTRICTS);
            break;
        case SupportedCountries.GBR:
            fullName = searchForStateName(stateCode, GBR_STATES_AND_TERRITORIES);
            break;
        case SupportedCountries.MEX:
            fullName = searchForStateName(stateCode, MEXICAN_STATES);
            break;
        case SupportedCountries.USA:
            fullName = searchForStateName(stateCode, USA_STATES);
            break;
        default:
            fullName = GENERIC_NOT_FOUND_LABEL;
            break;
    }
    return fullName;
}

const searchForStateName = (
    stateCode: string,
    stateList: { name: string; value: string; }[]
) => {
    let fullName: string;
    if(!stateCode) {
        fullName = stateList[0].name;
    } else if (stateCode.length > 2) {
        fullName = stateCode;
    } else {
        fullName = stateList.find(item => item.value === stateCode)?.name ?? GENERIC_NOT_FOUND_LABEL;
    }
    return fullName;
}

const getCityList = (
    country: SupportedCountries,
    state: string
) => {
    switch(country) {
        case SupportedCountries.AUS:
            return getAustralianCitiesByStateOrTerritory(state);
        case SupportedCountries.CAN:
            return getCanadianCitiesByProvinceOrTerritory(state);
        case SupportedCountries.CYM:
            return getCaymanDistrictsByArea(state);
        case SupportedCountries.GBR:
            return getGBRCitiesByStateOrTerritory(state);
        case SupportedCountries.MEX:
            return getMexicanCitiesByState(state);
        case SupportedCountries.USA:
        default:
            return getUSACitiesByState(state);
    }
}

const searchForCityName = (
    cityCode: string,
    cityList: { name: string; value: string; }[]
) => {
    let fullName: string;
    if(!cityCode) {
        fullName = cityList[0].name;
    } else {
        fullName = cityList.find(item => item.value === cityCode)?.name ?? GENERIC_NOT_FOUND_LABEL;
    }
    return fullName;
}

const getParishFullName = (
    parishCode: string
) => (LOUISIANA_PARISHES.find(item => item.value === parishCode)?.name ?? GENERIC_NOT_FOUND_LABEL);

export const useAddress = (
    initialAddress?: Partial<UserInputAddress>
) => {
    const
        defaultCityListData = getCityList(
            SupportedCountries.USA,
            USA_STATES[0].value as string
        ),
        [address, setAddress] = useState<ProtoAddressProps>({
            defaults: {
                supportedCountries: getCountryList(),
                country: SupportedCountries.USA,
                stateList: USA_STATES,
                stateCode: USA_STATES[0].value,
                stateName: USA_STATES[0].name,
                cityList: defaultCityListData,
                cityCode: defaultCityListData[0].value,
                cityName: defaultCityListData[0].name,
                customCity: null,
                locationNotListed: false,
                street: "",
                street2: null,
                street3: null,
                postalCode: "",
                showParishes: false,
                parishCode: null,
                parishName: null,
                parishList: null,
                isMUA: false,
            },
            userInputs: {
                country: null,
                stateList: null,
                stateCode: null,
                stateName: null,
                cityList: null,
                cityCode: null,
                cityName: null,
                customCity: null,
                locationNotListed: false,
                street: null,
                street2: null,
                street3: null,
                postalCode: null,
                showParishes: false,
                parishList: null,
                parishCode: null,
                parishName: null,
                isMUA: false,
                ...initialAddress
            }
        });

    const handleAddressChange = (
        field: keyof ProtoAddressProps['userInputs'],
        value: string | string[] | boolean | { name: string; value: string; }[] | null | undefined
    ) => {
        setAddress(prev => ({
            ...prev,
            ["userInputs"]: {
                ...prev.userInputs,
                [field]: value
            }
        }));
    }

    const handleAddressPrefillWithData = (
        address: UserInputAddress
    ) => {
        console.log("Inside Prefill Address: ", address);
        const
            showParishes = (address.country === SupportedCountries.USA) && (address.state === "LA"),
            isMUA = ((!!address?.street2 && address?.street2?.length > 0) || false);

        const
            updatedCityList = getCityList(address.country as SupportedCountries, address.state),
            cityFoundInList = searchForCityName(
                address.city,
                updatedCityList
            ) !== GENERIC_NOT_FOUND_LABEL;

        setAddress(prev => ({
            ...prev,
            ["userInputs"]: {
                ...prev.userInputs,
                street: address.street,
                street2: address.street2,
                street3: address.street3,
                cityCode: cityFoundInList ? address.city : GENERIC_NOT_FOUND_LABEL,
                cityName: cityFoundInList ? address.city : GENERIC_NOT_FOUND_LABEL,
                customCity: cityFoundInList ? null : address.city,
                stateCode: address.state,
                postalCode: address.postalCode,
                country: address.country,
                stateList: getStateListForCountry(address.country as SupportedCountries),
                cityList: updatedCityList,
                stateName: getStateFullName(address.country as SupportedCountries, address.state),
                showParishes,
                parishList: showParishes ? LOUISIANA_PARISHES : null,
                parishName: showParishes ? getParishFullName(address.street3 as string) : null,
                parishCode: showParishes ? address.street3 : null,
                isMUA,
                locationNotListed: !cityFoundInList
            }
        }));
    }

    function handleMUAClick(
        event: React.MouseEventHandler<HTMLInputElement>
    ) {
        const extraction: { target?: { checked?: boolean; } } = {
            ...event
        };
        handleAddressChange("isMUA", extraction?.target?.checked);
    }

    function handleLocationNotListedClick(
        event: React.MouseEventHandler<HTMLInputElement>
    ) {
        const extraction: { target?: { checked?: boolean; } } = {
            ...event
        };
        handleAddressChange("locationNotListed", extraction?.target?.checked);
    }

    function handleCountryChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const
            updatedStateList = getStateListForCountry(event.target.value as SupportedCountries),
            updatedCityList = getCityList(event.target.value as SupportedCountries, updatedStateList[0].value);

        if(event.target.value !== SupportedCountries.USA) {
            handleAddressChange("showParishes", false);
        }

        handleAddressChange("country", event.target.value);
        handleAddressChange("stateList", updatedStateList);
        handleAddressChange("stateCode", updatedStateList[0].value);
        handleAddressChange("stateName", updatedStateList[0].name);
        handleAddressChange("cityList", updatedCityList);
        handleAddressChange("cityCode", updatedCityList[0].value);
        handleAddressChange("cityName", updatedCityList[0].name);
    }

    function handleStateChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const
            determinedCountry = address.userInputs.country as SupportedCountries ??
                address.defaults.country as SupportedCountries,
            updatedStateList: { name: string; value: string; }[] = getStateListForCountry(determinedCountry),
            updatedCityList = getCityList(
                address.userInputs.country as SupportedCountries ?? address.defaults.country as SupportedCountries,
                event.target.value
            ),
            stateName =
                updatedStateList === undefined ?
                    GENERIC_NOT_FOUND_LABEL :
                    updatedStateList.filter((item: { name: string; value: string; }): string => {
                        if(item.value === event.target.value) {
                            return item.name;
                        }
                        return GENERIC_NOT_FOUND_LABEL;
                    });

        handleAddressChange("country", determinedCountry);
        handleAddressChange("stateList", updatedStateList);
        handleAddressChange("stateCode", event.target.value);
        handleAddressChange("stateName", stateName);
        handleAddressChange("cityList", updatedCityList);

        if(
            determinedCountry === SupportedCountries.USA && event.target.value === "LA"
        ) {
            handleAddressChange("parishList", LOUISIANA_PARISHES);
            handleAddressChange("showParishes", true);
            handleAddressChange("parishCode", "0");
            handleAddressChange("parishName", getParishFullName("0"));
        } else {
            handleAddressChange("showParishes", false);
            handleAddressChange("parishCode", null);
            handleAddressChange("parishName", null);
        }
    }

    function handleCityChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        if(address.userInputs.locationNotListed) {
            handleAddressChange("cityCode", null);
            handleAddressChange("cityName", null);
            handleAddressChange("customCity", event.target.value);
        } else {
            handleAddressChange("customCity", null);
            handleAddressChange("cityCode", event.target.value);
            handleAddressChange("cityName", event.target.value);
        }
    }

    function handleParishChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        handleAddressChange("parishCode", event.target.value);
        handleAddressChange("parishName", getParishFullName(event.target.value));
    }

    return {
        address,
        handleAddressChange,
        handleAddressPrefillWithData,
        handleMUAClick,
        handleLocationNotListedClick,
        handleCountryChange,
        handleCityChange,
        handleParishChange,
        handleStateChange,
    }
}