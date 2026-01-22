import {SupportedCountries} from "@/lib/utils/Address/address.utils";

type MexicanCitiesData = {
    [key: string]: string[]
}

/**
 * Constants and Helper Functions
 * */
export const MEXICAN_STATES = [
    {name: "Aguascalientes", value: "AG"},
    {name: "Baja California", value: "BC"},
    {name: "Baja California Sur", value: "BS"},
    {name: "Campeche", value: "CM"},
    {name: "Chiapas", value: "CH"},
    {name: "Chihuahua", value: "CH"},
    {name: "Coahuila de Zaragoza", value: "CO"},
    {name: "Colima", value: "CL"},
    {name: "Durango", value: "DG"},
    {name: "Guanajuato", value: "GT"},
    {name: "Guerrero", value: "GR"},
    {name: "Hidalgo", value: "HG"},
    {name: "Jalisco", value: "JC"},
    {name: "Estado de México", value: "EM"},
    {name: "Mexico City", value: "DF"},
    {name: "Michoacán de Ocampo", value: "MC"},
    {name: "Morelos", value: "MO"},
    {name: "Nayarit", value: "NA"},
    {name: "Nuevo León", value: "NL"},
    {name: "Oaxaca", value: "OA"},
    {name: "Puebla", value: "PU"},
    {name: "Querétaro", value: "QT"},
    {name: "Quintana Roo", value: "QR"},
    {name: "San Luis Potosí", value: "SL"},
    {name: "Sinaloa", value: "SI"},
    {name: "Sonora", value: "SO"},
    {name: "Tabasco", value: "TB"},
    {name: "Tamaulipas", value: "TM"},
    {name: "Tlaxcala", value: "TL"},
    {name: "Veracruz de Ignacio de la Llave", value: "VE"},
    {name: "Yucatán", value: "YU"},
    {name: "Zacatecas", value: "ZA"}
];
// Mexican cities data organized by state
const mexicanCities: MexicanCitiesData = {
    AG: ['Pabellón de Arteaga', 'El Llano', 'San Francisco de los Romo'],
    BC: ['Tijuana', 'Mexicali', 'Ensenada', 'Rosarito'],
    BS: ['La Paz', 'Los Cabos', 'Comondú', 'Mulegé'],
    CM: ['Carmen', 'Escárcega', 'Champotón'],
    CH: ['Ciudad Juárez', 'Cuauhtémoc', 'Delicias'],
    CO: ['Saltillo', 'Torreón', 'Monclova', 'Piedras Negras'],
    CL: ['Manzanillo', 'Villa de Álvarez', 'Coquimatlán'],
    DG: ['Gómez Palacio', 'Lerdo', 'Santiago Papasquiaro'],
    GT: ['León', 'Irapuato', 'Celaya', 'Salamanca'],
    GR: ['Chilpancingo', 'Acapulco', 'Chilapa', 'Zumpango'],
    HG: ['Pachuca', 'Tulancingo', 'Huejutla', 'Ixmiquilpan'],
    JC: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá'],
    EM: ['Toluca', 'Ecatepec', 'Netzahualcóyotl', 'Naucalpan'],
    DF: ['Mexico City', 'Iztapalapa', 'Gustavo A. Madero', 'Álvaro Obregón'],
    MC: ['Morelia', 'Uruapan', 'Zamora', 'Lázaro Cárdenas'],
    MO: ['Cuernavaca', 'Cuautla', 'Temixco', 'Jiutepec'],
    NA: ['Tepic', 'Compostela', 'Bahía de Banderas', 'Ixtlán del Río'],
    NL: ['Monterrey', 'Guadalupe', 'Apodaca', 'San Nicolás'],
    OA: ['Salina Cruz', 'Juchitán', 'San Juan Bautista Tuxtepec'],
    PU: ['Puebla', 'Cholula', 'Tehuacán', 'Atlixco'],
    QT: ['Querétaro', 'San Juan del Río', 'El Marqués', 'Corregidora'],
    QR: ['Cancún', 'Playa del Carmen', 'Tulum', 'Cozumel'],
    SL: ['San Luis Potosí', 'Soledad', 'Ciudad Valles', 'Matehuala'],
    SI: ['Culiacán', 'Mazatlán', 'Los Mochis', 'Guasave'],
    SO: ['Hermosillo', 'Ciudad Obregón', 'Nogales', 'San Luis Río Colorado'],
    TB: ['Villahermosa', 'Comalcalco', 'Paraíso', 'Centro'],
    TM: ['Nuevo Laredo', 'Matamoros', 'Tampico'],
    TL: ['Huamantla', 'San Pablo del Monte', 'Apizaco'],
    VE: ['Coatzacoalcos', 'Minatitlán', 'Poza Rica'],
    YU: ['Valladolid', 'Kanasín', 'Tizimín'],
    ZA: ['Fresnillo', 'Guadalupe', 'Sombrerete']
};

const MexicanCities = Object.keys(mexicanCities);

export const getMexicanCitiesByState = (requestedState: string): Array<{
    city: string;
    state: string;
    name: string;
    value: string;
}> => {
    if(MexicanCities.includes(requestedState)) {
        return mexicanCities[requestedState].map(city => {
            return ({
                city,
                name: city,
                value: city,
                state: requestedState,
                country: SupportedCountries.MEX
            })
        });
    } else {
        return mexicanCities["AG"].map(city => {
            return ({
                city,
                name: city,
                value: city,
                state: requestedState,
                country: SupportedCountries.MEX
            })
        });
    }
}