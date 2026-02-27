type CanadianCitiesData = {
    [key: string]: string[]
}

/**
 * Constants and Helper Functions
 * */
// Array of Canadian provinces and territories
export const CANADIAN_PROVINCES_AND_TERRITORIES = [
    { name: "Alberta", value: "AB" },
    { name: "British Columbia", value: "BC" },
    { name: "Manitoba", value: "MB" },
    { name: "New Brunswick", value: "NB" },
    { name: "Newfoundland and Labrador", value: "NL" },
    { name: "Northwest Territories", value: "NT" },
    { name: "Nova Scotia", value: "NS" },
    { name: "Nunavut", value: "NU" },
    { name: "Ontario", value: "ON" },
    { name: "Prince Edward Island", value: "PE" },
    { name: "Quebec", value: "QC" },
    { name: "Saskatchewan", value: "SK" },
    { name: "Yukon Territory", value: "YT" }
];

// Sample Canadian cities data organized by province/territory
const canadianCities: CanadianCitiesData = {
    AB: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    BC: ['Vancouver', 'Victoria', 'Kelowna', 'Burnaby'],
    MB: ['Winnipeg', 'Brandon', 'Steinbach', 'Portage la Prairie'],
    NB: ['Moncton', 'Saint John', 'Fredericton', 'Miramichi'],
    NL: ['St. John\'s', 'Mount Pearl', 'Corner Brook', 'Grand Falls-Windsor'],
    NT: ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith'],
    NS: ['Halifax', 'Dartmouth', 'Sydney', 'Truro'],
    NU: ['Iqaluit', 'Rankin Inlet', 'Cambridge Bay', 'Pond Inlet'],
    ON: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton'],
    PE: ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall'],
    QC: ['Montreal', 'Quebec City', 'Laval', 'Longueuil'],
    SK: ['Regina', 'Prince Albert', 'Moose Jaw'],
    YT: ['Whitehorse', 'Dawson City', 'Haines Junction', 'Watson Lake']
};

const CanadianCities = Object.keys(canadianCities);

export const getCanadianCitiesByProvinceOrTerritory = (requestedRegion: string): Array<{
    city: string;
    state: string;
    name: string;
    value: string;
}> => {
    if(CanadianCities.includes(requestedRegion)) {
        return canadianCities[requestedRegion].map(city => ({
            city,
            name: city,
            value: city,
            state: requestedRegion
        }));
    } else {
        return canadianCities["AB"].map(city => ({
            city,
            name: city,
            value: city,
            state: requestedRegion
        }));
    }
};