import { Station } from '../../types/station';
import { MarkerF } from '@react-google-maps/api';

interface MapContentProps {
    stations: Station[];
    handleMarkerClick: (station: Station) => void;
}

const MapContent = ({ stations, handleMarkerClick }: MapContentProps) => {
    return (
        <>
            {stations.map((station) => {
                return (
                    <MarkerF
                        key={`marker-${station.id}`}
                        position={station.position}
                        onClick={() => handleMarkerClick(station)}
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                    />
                );
            })}
        </>
    );
};

export default MapContent;
