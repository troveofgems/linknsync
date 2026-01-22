type CaymanDistrictsData = {
    [key: string]: string[]
}

/**
 * Constants and Helper Functions
 */
// Array of Cayman Islands districts
export const CAYMAN_DISTRICTS = [
    { name: "George Town", value: "GT" },
    { name: "West Bay", value: "WB" },
    { name: "Bodden Town", value: "BT" },
    { name: "North Side", value: "NS" },
    { name: "East End", value: "EE" },
    { name: "Cayman Brac and Little Cayman", value: "CBLC" }
];

// Sample Cayman Islands cities/towns data organized by district
const caymanDistricts: CaymanDistrictsData = {
    GT: ['George Town', 'Seven Mile Beach', 'South Sound', 'Prospect'],
    WB: ['West Bay', 'Hell', 'Conch Point', 'Birch Tree Hill'],
    BT: ['Bodden Town', 'Meagans Bay', 'Breakers', 'Spotts'],
    NS: ['Old Man Bay', 'Rum Point', 'Kaibo', 'Crystal Harbour'],
    EE: ['East End', 'High Rock', 'Gun Bay', 'Island Harbour'],
    CBLC: ['Stake Bay', 'West End', 'Watering Place', 'Little Cayman']
};

const CaymanDistricts = Object.keys(caymanDistricts);

export const getCaymanDistrictsByArea = (requestedRegion: string = "GT"): Array<{
    city: string;
    state: string;
    name: string;
    value: string;
}> => {
    if(CaymanDistricts.includes(requestedRegion)) {
        return caymanDistricts[requestedRegion].map(district => ({
            city: district,
            state: requestedRegion,
            name: district,
            value: district
        }));
    } else {
        return caymanDistricts["GT"].map(district => ({
            city: district,
            state: requestedRegion,
            name: district,
            value: district
        }));
    }
}