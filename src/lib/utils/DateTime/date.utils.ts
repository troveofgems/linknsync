/**
 * This File exports Custom Date Helpers For the App
 * */
const
    defaultLocale = "en-US",
    defaultFormat = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

export const datetimeConversionTo_String = (
    {
        timestamp,
        locale = defaultLocale,
        format = defaultFormat,
    }:
    {
        timestamp: number | Date | string;
        locale?: string;
        format?: {
            year: string;
            month: string;
            day: string;
            hour?: string;
            minute?: string;
            second?: string;
        }
    }
) => {
    if(!timestamp) return `Invalid/No Date Provided ${timestamp}`;
    if(typeof timestamp === "string") return timestamp; // Already a string.

    const formatter = new Intl.DateTimeFormat(locale, format);

    if(timestamp instanceof Date) {
        return formatter.format(timestamp.getTime());
    }

    return formatter.format(timestamp);
};

export const getDateString = (
    {
        dateStr
    }:
    {
        dateStr?: Date | number;
    }
) => {
    const
        stringConversion = datetimeConversionTo_String(dateStr),
        datePart = stringConversion.split(",")[0];

    if(!datePart) {
        throw new Error("Invalid date string. Unable to parse into datePart.");
    }

    return datePart;
};

export const lnsExportDateToICSFormat = (
    {
        date
    }:
    {
        date: Date;
    }
) => {
    const
        fillString = "0",
        year = date.getUTCFullYear().toString(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, fillString),
        day = date.getUTCDate().toString().padStart(2, fillString);
    return `${year}${month}${day}`;
}

export const lnsExportCreateDateToICSFormat = (
    {
        date
    }:
    {
        date: Date;
    }
) => {
    const
        fillString = "0",
        year = date.getUTCFullYear().toString(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, fillString),
        day = date.getUTCDate().toString().padStart(2, fillString),
        hours = date.getUTCHours().toString().padStart(2, fillString),
        minutes = date.getUTCMinutes().toString().padStart(2, fillString),
        seconds = date.getUTCSeconds().toString().padStart(2, fillString);
    return `${year}${month}${day}${hours}${minutes}${seconds}Z`;
}