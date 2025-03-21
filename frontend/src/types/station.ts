/**
 * Interface representing a measurement from a weather station
 * @interface Measurement
 * @property {string} value - The measured value
 * @property {string} timestamp - The time when measurement was taken
 * @property {string} variableName - Short name of the measured variable
 * @property {string} longName - Full descriptive name of the measured variable
 * @property {string} unit - Unit of measurement
 */
export interface Measurement {
    value: string;
    timestamp: string;
    variableName: string;
    longName: string;
    unit: string;
}

/**
 * Interface representing a formatted station with Google Maps compatible position
 * @interface Station
 * @property {number} id - Unique identifier for the station
 * @property {string} ws_name - Weather station name
 * @property {string} site - Location site name
 * @property {string} portfolio - owner the station belongs to
 * @property {string} state - Australian state where station is located
 * @property {Object} position - Google Maps compatible position object
 * @property {number} position.lat - Latitude coordinate
 * @property {number} position.lng - Longitude coordinate
 */
export interface Station {
    id: number;
    ws_name: string;
    site: string;
    portfolio: string;
    state: string;
    position: {
        lat: number;
        lng: number;
    };
}
