import {
    AUS_CITY_LABEL,
    CAN_STREET_1_LABEL, CAN_CITY_LABEL, CAN_STATE_LABEL,
    CYM_STATE_LABEL,
    DEFAULT_STREET_1_LABEL, DEFAULT_STREET_2_LABEL, DEFAULT_CITY_LABEL, DEFAULT_STATE_LABEL, DEFAULT_POSTAL_CODE_LABEL,
    GBR_CITY_LABEL,
    MEX_STREET_1_LABEL, MEX_STREET_2_LABEL, MEX_CITY_LABEL, MEX_STATE_LABEL, MEX_POSTAL_CODE_LABEL,
    DEFAULT_INCLUDE_SECONDARY_LINE, MEX_INCLUDE_SECONDARY_LINE, DEFAULT_COUNTRY_LABEL, MEX_COUNTRY_LABEL,
    DEFAULT_CITY_NOT_LISTED_LABEL, MEX_CITY_NOT_LISTED_LABEL
} from "@/constants/Address/Labels/address.label.constants";
import {getParishFullName} from "@/constants/Address/Countries/USA_States_and_Cities";
import {Address} from "@prisma/client";

/**
 * This File exports the Address Helper Functions For the App
 * */
export enum SupportedCountries {
    USA = "USA",
    CAN = "CAN",
    MEX = "MEX",
    GBR = "GBR",
    AUS = "AUS",
    CYM = "CYM",
}

export interface AddressFormatterProps {
    isMUA: boolean;
    street: string;
    street2: string | null;
    street3: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: SupportedCountries;
}

type Countries = {
    [key: string]: {
        name: string;
        residentialFormat: string;
        withUnitsFormat: string;
        value: string;
        basicExample: AddressFormatterProps;
        exampleWithUnits: AddressFormatterProps;
    };
}

export const formatAddress = (address: Partial<Address>): string => {
    const
        countryCode = getCountryCode(address.country as string),
        countryData: {
            name: string;
            residentialFormat: string;
            withUnitsFormat: string;
            value: string;
            basicExample: AddressFormatterProps;
            exampleWithUnits: AddressFormatterProps;
        } = COUNTRIES[`${countryCode}`];

    const addressLines = enforceAddressLineFormat(`${countryCode}` as SupportedCountries, address, countryData);

    return addressLines.filter((line) => !!line).join("\n");
};

export const getCountryList = () => ([...Object.values(COUNTRIES)]);

export const getCountryCode = (countryName: string): string => {
    const countryCodes = Object.keys(COUNTRIES);
    for (const code of countryCodes) {
        if(code === countryName) {
            return code;
        }
    }
    throw new Error(`Currently no supported format exists for ${countryName}.`);
};

export const COUNTRIES: Countries = {
    USA: {
        name: "United States of America",
        residentialFormat: "{{street_1}}\n{{city}}, {{state}} {{postalCode}}\n{{country}}",
        withUnitsFormat: "{{street_1}},\n{{street_2}}\n{{city}}, {{state}} {{postalCode}}\n{{country}}",
        value: "USA",
        basicExample: {
            isMUA: false,
            street: "5762 W Berry St",
            street2: null,
            street3: null,
            city: "Gilbert",
            state: "AZ",
            postalCode: "85275",
            country: SupportedCountries.USA,
        },
        exampleWithUnits: {
            isMUA: true,
            street: "5762 W Berry St",
            street2: "STE 201",
            street3: null,
            city: "Gilbert",
            state: "AZ",
            postalCode: "85275",
            country: SupportedCountries.USA,
        }
    },
    CAN: {
        name: "Canada",
        residentialFormat: "",
        withUnitsFormat: "",
        value: "CAN",
        basicExample: {
            isMUA: false,
            street: "10305 154 Ave",
            street2: null,
            street3: null,
            city: "Grande Prairie", // city
            state: "AB", // province or territory
            postalCode: "T8X 0J6", // postal code
            country: SupportedCountries.CAN,
        },
        exampleWithUnits: {
            isMUA: false,
            street: "85 St NW",
            street2: "309-11211",
            street3: null,
            city: "Edmonton",
            state: "AB",
            postalCode: "T5B 4T7",
            country: SupportedCountries.CAN,
        }
    },
    MEX: {
        name: "Mexico",
        residentialFormat: "",
        withUnitsFormat: "",
        value: "MEX",
        basicExample: {
            isMUA: false,
            street: "Loma 642",
            street2: null,
            street3: "Col. Nápoles",
            city: "Villa Diego Villarreal", // city
            state: "NLE", // province or territory
            postalCode: "66550", // postal code
            country: SupportedCountries.MEX,
        },
        exampleWithUnits: {
            isMUA: true,
            street: "Calz De La Quinta",
            street2: "9B",
            street3: "Col. Nápoles",
            city: "Barrio La Garita", // city
            state: "San Cristóbal De Las Casas, CHP", // locality or province
            postalCode: "29230", // postal code
            country: SupportedCountries.MEX,
        }
    },
    GBR: {
        name: "United Kingdom",
        residentialFormat: "",
        withUnitsFormat: "",
        value: "GBR",
        basicExample: {
            isMUA: false,
            street: "5 Cherry Tree Avenue",
            street2: null,
            street3: null,
            city: "Balerno", // city
            state: "EH14", // province or territory
            postalCode: "5AN", // postal code
            country: SupportedCountries.GBR,
        },
        exampleWithUnits: {
            isMUA: true,
            street: "16 Sutton Plaza",
            street2: "Flat 10",
            street3: null,
            city: "Sutton", // city
            state: "SM1", // province or territory
            postalCode: "4FW", // postal code
            country: SupportedCountries.GBR,
        }
    },
    AUS: {
        name: "Australia",
        residentialFormat: "",
        withUnitsFormat: "",
        value: "AUS",
        basicExample: {
            isMUA: false,
            street: "19 Woronora Ave",
            street2: null,
            street3: null,
            city: "Leumeah", // city
            state: "NSW", // province or territory
            postalCode: "2560", // postal code
            country: SupportedCountries.AUS,
        },
        exampleWithUnits: {
            isMUA: true,
            street: "56 Pirrama Rd",
            street2: "U 1",
            street3: null,
            city: "Pyrmont", // city
            state: "NSW", // province or territory
            postalCode: "2009", // postal code
            country: SupportedCountries.AUS,
        }
    },
    CYM: {
        name: "Cayman Islands",
        residentialFormat: "",
        withUnitsFormat: "",
        value: "CYM",
        basicExample: {
            isMUA: false,
            street: "35 Mount Pleasant Rd",
            street2: null,
            street3: null,
            city: "Mt Pleasant", // city
            state: "West Bay", // province or territory
            postalCode: "KY1-1300", // postal code
            country: SupportedCountries.CYM,
        },
        exampleWithUnits: {
            isMUA: true,
            street: "206g Esterley Tibbetts Hwy",
            street2: "Lakeside Ap 4",
            street3: null,
            city: "Snug Harbor", // city
            state: "George Town", // province or territory
            postalCode: "KY1-1200", // postal code
            country: SupportedCountries.CYM,
        }
    }
};

/*
 * Label Handlers for Different Countries
 * */
export const getStreet1LabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }) => {
    return (
        country === SupportedCountries.CAN ? CAN_STREET_1_LABEL :
        country === SupportedCountries.MEX ? MEX_STREET_1_LABEL : DEFAULT_STREET_1_LABEL
    );
};

export const getStreet2LabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }
) => {
    return (
        country === SupportedCountries.MEX ? MEX_STREET_2_LABEL : DEFAULT_STREET_2_LABEL
    );
};

export const getCityLabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }
) => {
    return (
        country === SupportedCountries.AUS ? AUS_CITY_LABEL :
        country === SupportedCountries.GBR ? GBR_CITY_LABEL :
        country === SupportedCountries.CAN ? CAN_CITY_LABEL :
        country === SupportedCountries.MEX ? MEX_CITY_LABEL : DEFAULT_CITY_LABEL
    )
};

export const getStateLabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }
) => {
    return (
        country === SupportedCountries.CAN ? CAN_STATE_LABEL :
        country === SupportedCountries.CYM ? CYM_STATE_LABEL :
        country === SupportedCountries.MEX ? MEX_STATE_LABEL : DEFAULT_STATE_LABEL
    );
};

export const getPostalCodeLabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }
) => {
    return (
        country === SupportedCountries.MEX ? MEX_POSTAL_CODE_LABEL : DEFAULT_POSTAL_CODE_LABEL
    );
};

export const getAddSecondLineLabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }
) => {
    return (
        country === SupportedCountries.MEX ? MEX_INCLUDE_SECONDARY_LINE : DEFAULT_INCLUDE_SECONDARY_LINE
    );
};

export const getCountryLabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }
) => {
    return (
        country === SupportedCountries.MEX ? MEX_COUNTRY_LABEL : DEFAULT_COUNTRY_LABEL
    );
};

export const getCityNotListedLabelForCountry = (
    {
        country
    }: {
        country: SupportedCountries
    }
) => {
    return (
        country === SupportedCountries.MEX ? MEX_CITY_NOT_LISTED_LABEL : DEFAULT_CITY_NOT_LISTED_LABEL
    );
};

// Internal Helper Functions
const enforceAddressLineFormat = (
    country: SupportedCountries,
    address: Partial<Address>,
    countryData?: {
        name: string;
        residentialFormat: string;
        withUnitsFormat: string;
        value: string;
        basicExample: AddressFormatterProps;
        exampleWithUnits: AddressFormatterProps;
    },
    showPrintFormat: boolean = false
) => {
    const
        addressBlock = [],
        isMultiUnit = !!address.street2 && address.street2?.length > 0 ? address.street2 : false,
        {street, street2, street3, city, state, postalCode, country: inputCountry} = address;

    switch(inputCountry) {
        case "USA":
            if(state === "LA") {
                addressBlock.push(`${getParishFullName(street3 as string)} Parish`);
            }
            addressBlock.push(isMultiUnit ? `${street},` : street);
            if(!!street2?.length && street2.length > 0) {
                addressBlock.push(street2);
            }
            addressBlock.push(`${city}, ${state} ${postalCode}`);
            addressBlock.push(`${COUNTRIES[inputCountry].value}`);
            break;
        case "CAN":
            addressBlock.push(isMultiUnit ? `${street2} ${street}` : street);
            addressBlock.push(`${city}, ${state} ${postalCode}`);
            addressBlock.push(`${country}`);
            break;
        case "MEX":
            addressBlock.push(isMultiUnit ? `${street} ${street2}` : street);
            addressBlock.push(street3);
            addressBlock.push(`${city}`);
            addressBlock.push(`${postalCode}, ${state}`)
            addressBlock.push(`${COUNTRIES[inputCountry].value}`);
            break;
        case "GBR":
            if(isMultiUnit) {
                addressBlock.push(`${street2}`);
                addressBlock.push(`${street}`);
            } else {
                addressBlock.push(`${street}`);
            }
            addressBlock.push(`${city}`);
            addressBlock.push(`${state} ${postalCode}`);
            addressBlock.push(`${COUNTRIES[inputCountry].value}`);
            break;
        case "AUS":
            addressBlock.push(isMultiUnit ? `${street2}/${street}` : street);
            addressBlock.push(`${city}`);
            addressBlock.push(`${state} ${postalCode}`);
            addressBlock.push(`${COUNTRIES[inputCountry].value}`);
            break;
        case "CYM":
            if(isMultiUnit) {
                addressBlock.push(street2);
                addressBlock.push(street);
            } else {
                addressBlock.push(street);
            }
            addressBlock.push(city);
            addressBlock.push(`${state} ${postalCode}`);
            addressBlock.push(`${COUNTRIES[inputCountry].value}`);
            break;
        default:
            break;
    }

    if(showPrintFormat) {
        addressBlock.push(`\n`);
        addressBlock.push(`Format Applied:`);
        if(isMultiUnit) {
            addressBlock.push(countryData!.withUnitsFormat);
        } else {
            addressBlock.push(countryData!.residentialFormat);
        }
    }

    return addressBlock;
}

