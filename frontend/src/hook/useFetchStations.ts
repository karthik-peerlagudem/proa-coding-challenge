import { useState, useEffect } from 'react';

interface StationResponse {
    id: number;
    ws_name: string;
    site: string;
    portfolio: string;
    state: string;
    latitude: number;
    longitude: number;
}

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
const API_END_POINT = import.meta.env.API_END_POINT;

const useFetchStations = () => {
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch(`${API_END_POINT}/api/station`);
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
