import { Request, Response } from 'express';
import { db } from '../index';
import { formatTimestamp } from '../lib/util';
import { Station, Variable, Measurement } from '../db/schema';
import { asc, desc, eq, max, and } from 'drizzle-orm';

/**
 * Retrieves all weather stations from the database
 * @param req Express request object
 * @param res Express response object
 * @returns JSON array of station data
 */
export const retrieveStation = async (req: Request, res: Response) => {
    try {
        const stations = await db
            .select({
                id: Station.stationId,
                ws_name: Station.name,
                site: Station.site,
                portfolio: Station.portfolio,
                state: Station.state,
                latitude: Station.latitude,
                longitude: Station.longitude,
            })
            .from(Station);
        res.status(200).json({
            data: stations,
        });
    } catch (error) {
        console.error('Error fetching stations:', error);
        res.status(500).json({
            error: 'Failed to retrieve stations',
        });
    }
};

/**
 * Retrieves latest measurements for a station
 * @param req Express request object with stationId param
 * @param res Express response object
 * @returns JSON object with latest measurements
 */
export const retrieveMeasurement: any = async (req: Request, res: Response) => {
    try {
        const { stationId } = req.params;

        if (!stationId) {
            return res.status(400).json({
                error: 'Station ID is required',
            });
        }

        //check if the station exists
        const station = await db
            .select()
            .from(Station)
            .where(eq(Station.stationId, parseInt(stationId)))
            .limit(1);

        if (!station.length) {
            return res.status(404).json({
                error: 'Station not found',
            });
        }

        // Get the latest timestamp first
        const latestTimestamp = await db
            .select({
                maxTime: max(Measurement.timestamp),
            })
            .from(Measurement)
            .innerJoin(
                Variable,
                eq(Variable.variableId, Measurement.variableId)
            )
            .where(eq(Variable.stationId, stationId));

        // If no measurements exist, return empty array
        if (!latestTimestamp[0].maxTime) {
            return res.status(200).json({
                data: [],
            });
        }

        // Get measurements for all variables at this timestamp
        const latestMeasurements = await db
            .select({
                value: Measurement.value,
                timestamp: Measurement.timestamp,
                variableName: Variable.name,
                longName: Variable.longName,
                unit: Variable.unit,
            })
            .from(Variable)
            .innerJoin(
                Measurement,
                and(
                    eq(Variable.variableId, Measurement.variableId),
                    eq(Measurement.timestamp, latestTimestamp[0].maxTime)
                )
            )
            .where(eq(Variable.stationId, stationId));

        const formattedMeasurements = latestMeasurements.map((m) => ({
            ...m,
            timestamp: formatTimestamp(m.timestamp),
        }));

        res.status(200).json({
            data: formattedMeasurements,
        });
    } catch (error) {
        console.error('Error fetching measurements:', error);
        res.status(500).json({
            error: 'Failed to retrieve measurements',
        });
    }
};
