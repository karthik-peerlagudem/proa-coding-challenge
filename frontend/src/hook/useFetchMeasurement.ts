import { useState, useEffect } from 'react';

export interface Measurement {
    value: string;
    timestamp: string;
    variableName: string;
    longName: string;
    unit: string;
}

interface UseFetchMeasurementResult {
    measurements: Measurement[];
    loading: boolean;
    error: string | null;
}

const useFetchMeasurement = (stationId: number): UseFetchMeasurementResult => {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeasurements = async () => {
            // If no stationId is provided, don't fetch
            if (!stationId) {
                setMeasurements([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `http://localhost:3001/api/measurement/${stationId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();

                if (result.data && Array.isArray(result.data)) {
                    setMeasurements(result.data);
                } else {
                    setMeasurements([]);
                    setError('No measurement data available');
                }
            } catch (error) {
                console.error('Error fetching measurements:', error);
                setError('Error loading measurement data');
                setMeasurements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMeasurements();
    }, [stationId]);

    return { measurements, loading, error };
};

export default useFetchMeasurement;
