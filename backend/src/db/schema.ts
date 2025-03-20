import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

/**
 * Station table - Stores weather monitoring station details
 * @typedef {Object} Station
 * @property {number} stationId - unique id for each weather station
 * @property {string} name - weather station name
 * @property {string} site - name of site weather station is located on
 * @property {string} portfolio - owner of the site
 * @property {string} state - australian state site is located in
 * @property {number} latitude - latitude of the weather station
 * @property {number} longitude - longitude of the weather station
 */
export const Station = sqliteTable('station', {
    stationId: integer('station_id').primaryKey(),
    name: text('name').notNull(),
    site: text('site').notNull(),
    portfolio: text('portfolio').notNull(),
    state: text('state').notNull(),
    latitude: real('latitude').notNull(),
    longitude: real('longitude').notNull(),
});

/**
 * Variable table - Defines measurable parameters at each station
 * @typedef {Object} Variable
 * @property {number} variableId - unique id for each variable
 * @property {number} stationId - unique id for each weather station
 * @property {string} name - Short name for each variable
 * @property {string} unit - the unit of measurement for each variable i.e., deg C = degrees Celsius
 * @property {string} longName - a descriptive name for each variable
 */
export const Variable = sqliteTable('variable', {
    variableId: integer('variable_id').primaryKey(),
    stationId: text('stations_id')
        .notNull()
        .references(() => Station.stationId),
    name: text('name').notNull(),
    unit: text('unit').notNull(),
    longName: text('long_name').notNull(),
});

/**
 * Measurement table - Records actual measurements from stations
 * @typedef {Object} Measurement
 * @property {number} measurementId - Auto-incrementing unique identifier
 * @property {number} variableId - Reference to the measured variable
 * @property {string} value - Recorded measurement value
 * @property {string} timestamp - Time when measurement was taken
 */
export const Measurement = sqliteTable('measurement', {
    measurementId: integer('measurement_id').primaryKey({
        autoIncrement: true,
    }),
    variableId: integer('variable_id')
        .notNull()
        .references(() => Variable.variableId),
    value: text('value').notNull(),
    timestamp: text('timestamp').notNull(),
});
