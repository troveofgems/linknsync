type GBRCitiesData = {
    [key: string]: string[];
}

/**
 * Constants and Helper Functions
 */
export const GBR_STATES_AND_TERRITORIES = [
    { name: "England", value: "ENG" },
    { name: "Scotland", value: "SCO" },
    { name: "Wales", value: "WAL" },
    { name: "Northern Ireland", value: "NIR" }
];

// British cities data organized by constituent country
const gbrCities: GBRCitiesData = {
    ENG: ['London', 'Birmingham', 'Leeds', 'Sheffield'],
    SCO: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
    WAL: ['Cardiff', 'Swansea', 'Newport', 'Bangor'],
    NIR: ['Belfast', 'Derry', 'Lisburn', 'Newtownabbey']
};

const GBRCities = Object.keys(gbrCities);

/**
 * Returns cities for a given constituent country
 */
export const getGBRCitiesByStateOrTerritory = (requestedRegion: string = "ENG"): Array<{
    city: string;
    state: string;
    name: string;
    value: string;
}> => {
    if(GBRCities.includes(requestedRegion)) {
        return gbrCities[requestedRegion].map(city =>
            ({
                city,
                state: requestedRegion,
                name: city,
                value: city
            })
        );
    } else {
        return gbrCities["ENG"].map(city =>
            ({
                city,
                state: requestedRegion,
                name: city,
                value: city
            })
        );
    }

}