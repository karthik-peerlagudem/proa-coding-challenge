import { InfoWindowF } from '@react-google-maps/api';
import { Station } from '../../hook/useFetchStations';
import useFetchMeasurement from '../../hook/useFetchMeasurement';

interface StationInfoWindowProps {
    selectedStation: Station;
    handleInfoWindowClose: () => void;
}

const StationInfoWindow = ({
    selectedStation,
    handleInfoWindowClose,
}: StationInfoWindowProps) => {
    const { measurements, loading, error } = useFetchMeasurement(
        selectedStation.id
    );

    return (
        <InfoWindowF
            position={selectedStation.position}
            onCloseClick={() => handleInfoWindowClose}
            options={{
                pixelOffset: new window.google.maps.Size(0, -40),
                maxWidth: 320,
                disableAutoPan: false,
                zIndex: 1000,
            }}
        >
            <div style={{ padding: '10px', maxWidth: '300px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                    {selectedStation.ws_name}
                </h3>
                <p style={{ margin: '4px 0' }}>
                    <strong>Site:</strong> {selectedStation.site}
                </p>
                <p style={{ margin: '4px 0' }}>
                    <strong>Portfolio:</strong> {selectedStation.portfolio}
                </p>
                <p style={{ margin: '4px 0' }}>
                    <strong>State:</strong> {selectedStation.state}
                </p>

                {/* Measurements section */}
                <div
                    style={{
                        marginTop: '12px',
                        borderTop: '1px solid #eee',
                        paddingTop: '10px',
                    }}
                >
                    <h4
                        style={{
                            margin: '0 0 8px 0',
                            fontSize: '15px',
                            color: '#555',
                        }}
                    >
                        Latest Measurements
                    </h4>

                    {loading && (
                        <p style={{ fontSize: '14px', color: '#666' }}>
                            Loading measurement data...
                        </p>
                    )}

                    {error && (
                        <p style={{ fontSize: '14px', color: 'red' }}>
                            {error}
                        </p>
                    )}

                    {!loading && !error && measurements.length > 0 && (
                        <>
                            <p
                                style={{
                                    margin: '4px 0',
                                    fontSize: '13px',
                                    color: '#777',
                                }}
                            >
                                <strong>Time:</strong>{' '}
                                {measurements[0].timestamp}
                            </p>

                            {measurements.map((measurement, index) => (
                                <p key={index} style={{ margin: '4px 0' }}>
                                    <strong>{measurement.longName}:</strong>{' '}
                                    {parseFloat(measurement.value).toFixed(2)}{' '}
                                    {measurement.unit}
                                </p>
                            ))}
                        </>
                    )}

                    {!loading && !error && measurements.length === 0 && (
                        <p style={{ fontSize: '14px', color: '#666' }}>
                            No measurement data available
                        </p>
                    )}
                </div>
            </div>
        </InfoWindowF>
    );
};

export default StationInfoWindow;
