import { db } from '../src/index';
import { Measurement, Station, Variable } from '../src/db/schema';

import { convertToSQLiteTimestamp } from '../src/lib/util';

/**
 * Seeds the database with sample weather station data
 * Includes stations, variables, and measurements data
 *
 * Data Structure:
 * - Stations: Weather station locations and metadata
 * - Variables: Measurement types for each station
 * - Measurements: Actual weather measurements with timestamps
 *
 * @async
 * @throws {Error} If database operations fail
 */
async function seed() {
    try {
        const stations = [
            {
                stationId: 1,
                name: 'Cohuna North',
                site: 'Cohuna Solar Farm',
                portfolio: 'Enel Green Power',
                state: 'VIC',
                latitude: -35.882762,
                longitude: 144.217208,
            },
            {
                stationId: 2,
                name: 'Bungala 1 West',
                site: 'Bungala 1 Solar Farm',
                portfolio: 'Enel Green Power',
                state: 'SA',
                latitude: -32.430536,
                longitude: 137.846245,
            },
            {
                stationId: 3,
                name: 'Bungala 2 East',
                site: 'Bungala 2 Solar Farm',
                portfolio: 'Enel Green Power',
                state: 'SA',
                latitude: -32.405243,
                longitude: 137.833565,
            },
            {
                stationId: 4,
                name: 'Parkes North',
                site: 'Parkes Solar Farm',
                portfolio: 'NEOEN',
                state: 'NSW',
                latitude: -33.104181,
                longitude: 148.07779,
            },
            {
                stationId: 5,
                name: 'Parkes South',
                site: 'Parkes Solar Farm',
                portfolio: 'NEOEN',
                state: 'NSW',
                latitude: -33.123945,
                longitude: 148.077615,
            },
            {
                stationId: 6,
                name: 'Parkes East',
                site: 'Parkes Solar Farm',
                portfolio: 'NEOEN',
                state: 'NSW',
                latitude: -33.110485,
                longitude: 148.101728,
            },
            {
                stationId: 7,
                name: 'Coopers Gap Mast',
                site: 'Coopers Gap Wind Farm',
                portfolio: 'AGL',
                state: 'QLD',
                latitude: -26.744933,
                longitude: 151.46473,
            },
            {
                stationId: 8,
                name: 'Bulgana Mast',
                site: 'Bulgana Green Power Hub',
                portfolio: 'NEOEN',
                state: 'VIC',
                latitude: -37.062474,
                longitude: 142.950079,
            },
            {
                stationId: 9,
                name: 'Childers West',
                site: 'Childers Solar Farm',
                portfolio: 'Atmos',
                state: 'QLD',
                latitude: -25.304253,
                longitude: 152.407882,
            },
            {
                stationId: 10,
                name: 'Darlington MS',
                site: 'Darlington Solar Farm',
                portfolio: 'Edify',
                state: 'NSW',
                latitude: -34.647727,
                longitude: 146.063079,
            },
        ];

        const variables = [
            {
                variableId: 11,
                stationId: '1',
                name: 'AirT_inst',
                unit: 'Deg C',
                longName: 'Air Temp.',
            },
            {
                variableId: 12,
                stationId: '1',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 21,
                stationId: '2',
                name: 'AirT_inst',
                unit: 'Deg C',
                longName: 'Air Temp.',
            },
            {
                variableId: 22,
                stationId: '2',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 31,
                stationId: '3',
                name: 'AirT_inst',
                unit: 'Deg C',
                longName: 'Air Temp.',
            },
            {
                variableId: 32,
                stationId: '3',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 41,
                stationId: '4',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 51,
                stationId: '5',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 61,
                stationId: '6',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 71,
                stationId: '7',
                name: 'WS_avg',
                unit: 'm/s',
                longName: 'Wind Speed Avg.',
            },
            {
                variableId: 72,
                stationId: '7',
                name: 'WD_avg',
                unit: 'Deg',
                longName: 'Wind Dir. Avg.',
            },
            {
                variableId: 81,
                stationId: '8',
                name: 'WS_avg',
                unit: 'm/s',
                longName: 'Wind Speed Avg.',
            },
            {
                variableId: 82,
                stationId: '8',
                name: 'WD_avg',
                unit: 'Deg',
                longName: 'Wind Dir. Avg.',
            },
            {
                variableId: 91,
                stationId: '9',
                name: 'AirT_inst',
                unit: 'Deg C',
                longName: 'Air Temp.',
            },
            {
                variableId: 92,
                stationId: '9',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 101,
                stationId: '10',
                name: 'GHI_inst',
                unit: 'W/m^2',
                longName: 'Solar Irrad.',
            },
            {
                variableId: 102,
                stationId: '10',
                name: 'AirT_inst',
                unit: 'Deg C',
                longName: 'Air Temp.',
            },
        ];

        const measurementsData1 = [
            { time: '29/08/2023 06:00:00', airTemp: 17.09, ghi: 64 },
            { time: '29/08/2023 06:05:00', airTemp: 17.22, ghi: 47 },
            { time: '29/08/2023 06:10:00', airTemp: 17.32, ghi: 46 },
            { time: '29/08/2023 06:15:00', airTemp: 17.2, ghi: 56 },
            { time: '29/08/2023 06:20:00', airTemp: 17.17, ghi: 60 },
            { time: '29/08/2023 06:25:00', airTemp: 17.24, ghi: 58 },
            { time: '29/08/2023 06:30:00', airTemp: 17.51, ghi: 54 },
            { time: '29/08/2023 06:35:00', airTemp: 17.84, ghi: 55 },
            { time: '29/08/2023 06:40:00', airTemp: 17.97, ghi: 56 },
            { time: '29/08/2023 06:45:00', airTemp: 17.87, ghi: 54 },
            { time: '29/08/2023 06:50:00', airTemp: 17.62, ghi: 60 },
            { time: '29/08/2023 06:55:00', airTemp: 17.54, ghi: 46 },
        ];

        const measurementsData3 = [
            { time: '29/08/2023 02:05:00', airTemp: 19.4833, ghi: 728.937 },
            { time: '29/08/2023 02:10:00', airTemp: 19.4439, ghi: 728.64 },
            { time: '29/08/2023 02:15:00', airTemp: 19.503, ghi: 726.759 },
            { time: '29/08/2023 02:20:00', airTemp: 19.1681, ghi: 726.66 },
            { time: '29/08/2023 02:25:00', airTemp: 19.306, ghi: 724.779 },
            { time: '29/08/2023 02:30:00', airTemp: 18.8529, ghi: 722.205 },
            { time: '29/08/2023 02:35:00', airTemp: 18.84305, ghi: 719.829 },
            { time: '29/08/2023 02:40:00', airTemp: 19.11885, ghi: 715.473 },
            { time: '29/08/2023 02:45:00', airTemp: 19.4833, ghi: 710.523 },
            { time: '29/08/2023 02:50:00', airTemp: 19.55225, ghi: 705.969 },
            { time: '29/08/2023 02:55:00', airTemp: 19.57195, ghi: 701.514 },
            { time: '29/08/2023 03:00:00', airTemp: 19.63105, ghi: 695.376 },
        ];

        const measurementsData4 = [
            { time: '29/08/2023 02:00:00', ghi: 750 },
            { time: '29/08/2023 02:05:00', ghi: 751.7 },
            { time: '29/08/2023 02:10:00', ghi: 754.1 },
            { time: '29/08/2023 02:15:00', ghi: 759.6 },
            { time: '29/08/2023 02:20:00', ghi: 764.7 },
            { time: '29/08/2023 02:25:00', ghi: 780.4 },
            { time: '29/08/2023 02:30:00', ghi: 783.1 },
            { time: '29/08/2023 02:35:00', ghi: 723.4 },
            { time: '29/08/2023 02:40:00', ghi: 748.3 },
            { time: '29/08/2023 02:45:00', ghi: 749.1 },
            { time: '29/08/2023 02:50:00', ghi: 693.1 },
            { time: '29/08/2023 02:55:00', ghi: 753.4 },
            { time: '29/08/2023 03:00:00', ghi: 750.6 },
        ];

        const measurementsData5 = [
            { time: '29/08/2023 02:00:00', ghi: 738.75 },
            { time: '29/08/2023 02:05:00', ghi: 740.4245 },
            { time: '29/08/2023 02:10:00', ghi: 742.7885 },
            { time: '29/08/2023 02:15:00', ghi: 748.206 },
            { time: '29/08/2023 02:20:00', ghi: 753.2295 },
            { time: '29/08/2023 02:25:00', ghi: 768.694 },
            { time: '29/08/2023 02:30:00', ghi: 771.3535 },
            { time: '29/08/2023 02:35:00', ghi: 712.549 },
            { time: '29/08/2023 02:40:00', ghi: 737.0755 },
            { time: '29/08/2023 02:45:00', ghi: 737.8635 },
            { time: '29/08/2023 02:50:00', ghi: 682.7035 },
            { time: '29/08/2023 02:55:00', ghi: 742.099 },
            { time: '29/08/2023 03:00:00', ghi: 739.341 },
        ];

        const measurementsData6 = [
            { time: '29/08/2023 02:00:00', ghi: 701.8125 },
            { time: '29/08/2023 02:05:00', ghi: 703.403275 },
            { time: '29/08/2023 02:10:00', ghi: 705.649075 },
            { time: '29/08/2023 02:15:00', ghi: 710.7957 },
            { time: '29/08/2023 02:20:00', ghi: 715.568025 },
            { time: '29/08/2023 02:25:00', ghi: 730.2593 },
            { time: '29/08/2023 02:30:00', ghi: 732.785825 },
            { time: '29/08/2023 02:35:00', ghi: 676.92155 },
            { time: '29/08/2023 02:40:00', ghi: 700.221725 },
            { time: '29/08/2023 02:45:00', ghi: 700.970325 },
            { time: '29/08/2023 02:50:00', ghi: 648.568325 },
            { time: '29/08/2023 02:55:00', ghi: 704.99405 },
            { time: '29/08/2023 03:00:00', ghi: 702.37395 },
        ];

        const measurementsData7 = [
            { time: '29/08/2023 02:00:00', ws: 1.443, wd: 190.4 },
            { time: '29/08/2023 02:05:00', ws: 1.634, wd: 37.11 },
            { time: '29/08/2023 02:10:00', ws: 1.806, wd: 229.1 },
            { time: '29/08/2023 02:15:00', ws: 2.642, wd: 303.9 },
            { time: '29/08/2023 02:20:00', ws: 2.633, wd: 274.6 },
            { time: '29/08/2023 02:25:00', ws: 2.266, wd: 311.9 },
            { time: '29/08/2023 02:30:00', ws: 2.716, wd: 322.9 },
            { time: '29/08/2023 02:35:00', ws: 2.578, wd: 310.6 },
            { time: '29/08/2023 02:40:00', ws: 2.992, wd: 315.1 },
            { time: '29/08/2023 02:45:00', ws: 2.395, wd: 298.0 },
            { time: '29/08/2023 02:50:00', ws: 2.533, wd: 292.8 },
            { time: '29/08/2023 02:55:00', ws: 1.913, wd: 274.1 },
            { time: '29/08/2023 03:00:00', ws: 2.237, wd: 295.5 },
        ];

        const measurementsData8 = [
            { time: '29/08/2023 02:00:00', ws: 2.366, wd: 183.1 },
            { time: '29/08/2023 02:05:00', ws: 2.234, wd: 210.4 },
            { time: '29/08/2023 02:10:00', ws: 2.547, wd: 224.2 },
            { time: '29/08/2023 02:15:00', ws: 2.318, wd: 228.6 },
            { time: '29/08/2023 02:20:00', ws: 2.618, wd: 188.6 },
            { time: '29/08/2023 02:25:00', ws: 1.86, wd: 203.9 },
            { time: '29/08/2023 02:30:00', ws: 2.375, wd: 237.8 },
            { time: '29/08/2023 02:35:00', ws: 2.079, wd: 260.1 },
            { time: '29/08/2023 02:40:00', ws: 2.098, wd: 234.1 },
            { time: '29/08/2023 02:45:00', ws: 1.99, wd: 214.4 },
            { time: '29/08/2023 02:50:00', ws: 2.21, wd: 270.0 },
            { time: '29/08/2023 02:55:00', ws: 2.313, wd: 230.2 },
            { time: '29/08/2023 03:00:00', ws: 1.892, wd: 187.6 },
        ];

        const measurementsData9 = [
            { time: '29/08/2023 02:05:00', ghi: 120.9, airTemp: 21.88 },
            { time: '29/08/2023 02:10:00', ghi: 127.8, airTemp: 21.79 },
            { time: '29/08/2023 02:15:00', ghi: 147.0, airTemp: 21.29 },
            { time: '29/08/2023 02:20:00', ghi: 129.3, airTemp: 20.81 },
            { time: '29/08/2023 02:25:00', ghi: 110.6, airTemp: 20.7 },
            { time: '29/08/2023 02:30:00', ghi: 113.5, airTemp: 20.46 },
            { time: '29/08/2023 02:35:00', ghi: 108.6, airTemp: 20.25 },
            { time: '29/08/2023 02:40:00', ghi: 114.1, airTemp: 20.02 },
            { time: '29/08/2023 02:45:00', ghi: 116.4, airTemp: 20.1 },
            { time: '29/08/2023 02:50:00', ghi: 106.5, airTemp: 20.0 },
            { time: '29/08/2023 02:55:00', ghi: 103.4, airTemp: 20.14 },
            { time: '29/08/2023 03:00:00', ghi: 126.6, airTemp: 19.9 },
        ];

        const measurementsData10 = [
            { time: '28/08/2023 02:00:00', ghi: 746.9, airTemp: 17.71 },
            { time: '28/08/2023 02:05:00', ghi: 746.8, airTemp: 17.57 },
            { time: '28/08/2023 02:10:00', ghi: 750.0, airTemp: 17.82 },
            { time: '28/08/2023 02:00:00', ghi: 747.8, airTemp: 18.4 },
            { time: '28/08/2023 02:00:00', ghi: 743.6, airTemp: 18.2 },
            { time: '28/08/2023 02:00:00', ghi: 740.8, airTemp: 18.65 },
            { time: '28/08/2023 02:00:00', ghi: 737.2, airTemp: 17.87 },
            { time: '28/08/2023 02:00:00', ghi: 735.1, airTemp: 18.47 },
            { time: '28/08/2023 02:00:00', ghi: 734.1, airTemp: 18.85 },
            { time: '28/08/2023 02:00:00', ghi: 733.6, airTemp: 18.48 },
            { time: '28/08/2023 02:00:00', ghi: 728.4, airTemp: 18.6 },
            { time: '28/08/2023 02:00:00', ghi: 721.7, airTemp: 18.41 },
            { time: '28/08/2023 02:00:00', ghi: 733.4, airTemp: 18.57 },
        ];

        const measurements1 = measurementsData1.flatMap((measurement) => {
            return [
                {
                    variableId: 11,
                    value: measurement.airTemp.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
                {
                    variableId: 12,
                    value: measurement.ghi.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements3 = measurementsData3.flatMap((measurement) => {
            return [
                {
                    variableId: 31,
                    value: measurement.airTemp.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
                {
                    variableId: 32,
                    value: measurement.ghi.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements4 = measurementsData4.flatMap((measurement) => {
            return [
                {
                    variableId: 41,
                    value: measurement.ghi.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements5 = measurementsData5.flatMap((measurement) => {
            return [
                {
                    variableId: 51,
                    value: measurement.ghi.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements6 = measurementsData6.flatMap((measurement) => {
            return [
                {
                    variableId: 61,
                    value: measurement.ghi.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements7 = measurementsData7.flatMap((measurement) => {
            return [
                {
                    variableId: 71,
                    value: measurement.ws.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
                {
                    variableId: 72,
                    value: measurement.wd.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements8 = measurementsData8.flatMap((measurement) => {
            return [
                {
                    variableId: 81,
                    value: measurement.ws.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
                {
                    variableId: 82,
                    value: measurement.wd.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements9 = measurementsData9.flatMap((measurement) => {
            return [
                {
                    variableId: 91,
                    value: measurement.airTemp.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
                {
                    variableId: 92,
                    value: measurement.ghi.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        const measurements10 = measurementsData10.flatMap((measurement) => {
            return [
                {
                    variableId: 101,
                    value: measurement.ghi.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
                {
                    variableId: 102,
                    value: measurement.airTemp.toString(),
                    timestamp: convertToSQLiteTimestamp(measurement.time),
                },
            ];
        });

        // Insert Stations
        await db.insert(Station).values(stations);
        console.log('Station seeded successfully');

        // Insert Variables
        await db.insert(Variable).values(variables);
        console.log('Variable seeded successfully');

        // Insert Measurements
        await db.insert(Measurement).values(measurements1);
        console.log('Measurement (Stations 1) seeded successfully');

        await db.insert(Measurement).values(measurements3);
        console.log('Measurement (Station 3) seeded successfully');

        await db.insert(Measurement).values(measurements4);
        console.log('Measurement (Station 4) seeded successfully');

        await db.insert(Measurement).values(measurements5);
        console.log('Measurement (Station 5) seeded successfully');

        await db.insert(Measurement).values(measurements6);
        console.log('Measurement (Station 6) seeded successfully');

        await db.insert(Measurement).values(measurements7);
        console.log('Measurement (Station 7) seeded successfully');

        await db.insert(Measurement).values(measurements8);
        console.log('Measurement (Station 8) seeded successfully');

        await db.insert(Measurement).values(measurements9);
        console.log('Measurement (Station 9) seeded successfully');

        await db.insert(Measurement).values(measurements10);
        console.log('Measurement (Station 10) seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        process.exit(0);
    }
}

seed();
