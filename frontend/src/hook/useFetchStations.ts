import { useState, useEffect } from 'react';
import { Station } from '../types/station';

interface StationResponse {
    id: number;
    ws_name: string;
    site: string;
    portfolio: string;
    state: string;
    latitude: number;
    longitude: number;
}

/**
 * Custom hook for fetching and formatting weather station data
 *
 * @function useFetchStations
 * @returns {Station[]} stations - Array of formatted station objects
 *
 */
const useFetchStations = () => {
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/station`
                );
                const result = await response.json();

                const formattedStations = result.data.map(
                    (station: StationResponse) => ({
                        id: station.id,
                        ws_name: station.ws_name,
                        site: station.site,
                        portfolio: station.portfolio,
                        state: station.state,
                        position: {
                            lat: station.latitude,
                            lng: station.longitude,
                        },
                    })
                );
                setStations(formattedStations);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        fetchStations();
    }, []);

    return { stations };
};

export default useFetchStations;
