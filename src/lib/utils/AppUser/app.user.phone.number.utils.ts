/**
 * This File exports the App User Phone Number Helper Functions For the App
 * */

enum SupportedCountries {
    USA = "USA",
    CAN = "CAN",
    MEX = "MEX",
    GBR = "GBR",
    AUS = "AUS",
    CYM = "CYM",
}

interface FormattedPhoneNumber {
    formatted: string;
    isValid: boolean;
}

const defaultCountry = SupportedCountries.USA;

export const formatPhoneNumber = (
    {
        phoneNumber,
        locale = defaultCountry,
    }:
    {
        phoneNumber: string;
        locale?: SupportedCountries;
    }
): FormattedPhoneNumber => {
    const cleanedPhoneNumber = phoneNumber.replace(/[^+\d]/g, '');

    switch(locale) {
        case SupportedCountries.AUS:
            return phoneConversionTo_AustraliaFormat({cleanedPhoneNumber});
        case SupportedCountries.CAN:
            return phoneConversionTo_CanadaFormat({cleanedPhoneNumber});
        case SupportedCountries.CYM:
            return phoneConversionTo_CaymanFormat({cleanedPhoneNumber});
        case SupportedCountries.GBR:
            return phoneConversionTo_UKFormat({cleanedPhoneNumber});
        case SupportedCountries.MEX:
            return phoneConversionTo_MexicoFormat({cleanedPhoneNumber});
        case SupportedCountries.USA:
            return phoneConversionTo_USFormat({cleanedPhoneNumber});
        default:
            return {
                isValid: false,
                formatted: "Invalid Phone Number Provided For Given Formats."
            }
    }
}

/**
 * COUNTRY FORMATTERS
 * */
const phoneConversionTo_USFormat = (
    {
        cleanedPhoneNumber
    }:
    {
        cleanedPhoneNumber: string;
    }
): FormattedPhoneNumber => {
    if (!cleanedPhoneNumber.match(/^\+1\d{10}$/)) {
        return { formatted: "Invalid Phone Number For United States", isValid: false };
    }

    const formattedString = getFormattedStringForCountry({
        countryCode: "+1",
        cleanedPhoneNumber,
        country: SupportedCountries.USA
    });

    return {
        formatted: formattedString,
        isValid: true
    };
};

const phoneConversionTo_AustraliaFormat = (
    {
        cleanedPhoneNumber
    }:
    {
        cleanedPhoneNumber: string;
    }
): FormattedPhoneNumber => {
    if (!cleanedPhoneNumber.match(/^\+61\d{10}$/)) {
        return { formatted: "Invalid Phone Number For Australia", isValid: false };
    }

    const formattedString = getFormattedStringForCountry({
        countryCode: "+61",
        cleanedPhoneNumber,
        country: SupportedCountries.AUS
    });

    return {
        formatted: formattedString,
        isValid: true
    };
};

const phoneConversionTo_CanadaFormat = (
    {
        cleanedPhoneNumber
    }:
    {
        cleanedPhoneNumber: string;
    }
): FormattedPhoneNumber => {
    if (!cleanedPhoneNumber.match(/^\+1\d{10}$/)) {
        return { formatted: "Invalid Phone Number For Canada", isValid: false };
    }

    const formattedString = getFormattedStringForCountry({
        countryCode: "+1",
        cleanedPhoneNumber,
        country: SupportedCountries.CAN
    });

    return {
        formatted: formattedString,
        isValid: true
    };
};

const phoneConversionTo_MexicoFormat = (
    {
        cleanedPhoneNumber
    }:
    {
        cleanedPhoneNumber: string;
    }
): FormattedPhoneNumber => {
    if (!cleanedPhoneNumber.match(/^\+52\d{10}$/)) {
        return { formatted: "Invalid Phone Number For Mexico", isValid: false };
    }

    const formattedString = getFormattedStringForCountry({
        countryCode: "+52",
        cleanedPhoneNumber,
        country: SupportedCountries.MEX
    });

    return {
        formatted: formattedString,
        isValid: true
    };
};

const phoneConversionTo_CaymanFormat = (
    {
        cleanedPhoneNumber
    }:
    {
        cleanedPhoneNumber: string;
    }
): FormattedPhoneNumber => {
    if (!cleanedPhoneNumber.match(/^\+1\d{10}$/)) {
        return { formatted: "Invalid Phone Number For Cayman Islands", isValid: false };
    }

    const formattedString = getFormattedStringForCountry({
        countryCode: "+1",
        cleanedPhoneNumber,
        country: SupportedCountries.CYM
    });

    return {
        formatted: formattedString,
        isValid: true
    };
};

const phoneConversionTo_UKFormat = (
    {
        cleanedPhoneNumber
    }:
    {
        cleanedPhoneNumber: string;
    }
): FormattedPhoneNumber => {
    if (!cleanedPhoneNumber.match(/^\+44\d{10}$/)) {
        return { formatted: "Invalid Phone Number For UK", isValid: false };
    }

    const formattedString = getFormattedStringForCountry({
        countryCode: "+44",
        cleanedPhoneNumber,
        country: SupportedCountries.GBR
    });

    return {
        formatted: formattedString,
        isValid: true
    };
};

// Internal File Helpers
const getFormattedStringForCountry = (
    {
        countryCode,
        cleanedPhoneNumber,
        country
    }:
    {
        countryCode: string;
        cleanedPhoneNumber: string;
        country: SupportedCountries;
    }
): string => {
    let
        formattedString = `${countryCode} `,
        areaCode = "",
        prefix = "",
        lineNumber = "";

    switch(country) {
        case SupportedCountries.USA:
        case SupportedCountries.CAN:
        case SupportedCountries.CYM:
            areaCode = cleanedPhoneNumber.slice(2, 5);
            prefix = cleanedPhoneNumber.slice(5, 8);
            lineNumber = cleanedPhoneNumber.slice(8);
            formattedString += ` (${areaCode}) ${prefix}-${lineNumber}`
            break;
        case SupportedCountries.AUS:
        case SupportedCountries.MEX:
            areaCode = cleanedPhoneNumber.slice(2, 4);
            prefix = cleanedPhoneNumber.slice(4, 8);
            lineNumber = cleanedPhoneNumber.slice(8);
            formattedString += ` ${areaCode} ${prefix} ${lineNumber}`;
            break;
        case SupportedCountries.GBR:
            areaCode = cleanedPhoneNumber.slice(2, 6);
            prefix = cleanedPhoneNumber.slice(6, 9);
            lineNumber = cleanedPhoneNumber.slice(9);
            formattedString += `${areaCode} ${prefix} ${lineNumber}`;
            break;
        default:
            formattedString = "Unable To Format Phone Number";
            break;
    }

    return formattedString;
}