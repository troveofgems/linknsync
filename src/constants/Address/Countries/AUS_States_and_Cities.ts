type AustralianCitiesData = {
    [key: string]: string[];
}

/**
 * Constants and Helper Functions
 */
export const AUSTRALIAN_STATES_AND_TERRITORIES = [
    { name: "Australian Capital Territory", value: "ACT" },
    { name: "New South Wales", value: "NSW" },
    { name: "Northern Territory", value: "NT" },
    { name: "Queensland", value: "QLD" },
    { name: "South Australia", value: "SA" },
    { name: "Tasmania", value: "TAS" },
    { name: "Victoria", value: "VIC" },
    { name: "Western Australia", value: "WA" }
];

// Sample Australian cities data organized by state/territory
const australianCities: AustralianCitiesData = {
    ACT: ['Canberra', 'Belconnen', 'Gungahlin', 'Tuggeranong'],
    NSW: ['Sydney', 'Newcastle', 'Central Coast', 'Wollongong'],
    NT: ['Darwin', 'Palmerston', 'Alice Springs', 'Katherine'],
    QLD: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville'],
    SA: ['Adelaide', 'Mount Gambier', 'Whyalla', 'Port Lincoln'],
    TAS: ['Hobart', 'Launceston', 'Devonport', 'Burnie'],
    VIC: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'],
    WA: ['Perth', 'Fremantle', 'Mandurah', 'Rockingham']
};

const AustralianCities = Object.keys(australianCities);

/**
 * Returns cities for a given state/territory
 */
export const getAustralianCitiesByStateOrTerritory = (requestedRegion: string = "ACT"): Array<{
    city: string;
    state: string;
    name: string;
    value: string;
}> => {
    if(AustralianCities.includes(requestedRegion)) {
        return australianCities[requestedRegion].map(city => ({
            city,
            state: requestedRegion,
            name: city,
            value: city
        }));
    } else {
        return australianCities["ACT"].map(city => ({
            city,
            state: requestedRegion,
            name: city,
            value: city
        }));
    }
}