import { useRef, useCallback, useState, useEffect } from 'react';
import {
    GoogleMap,
    GoogleMap as GoogleMapType,
    useLoadScript,
} from '@react-google-maps/api';

import useFetchStations, { Station } from '../../hook/useFetchStations';

import StationInfoWindow from '../station-info-window';
import MapContent from './MapContent';

// Get API key from environment
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
};

const LoadGoogleMap = () => {
    const [selectedStation, setSelectedStation] = useState<Station | null>(
        null
    );
    const [infoWindowKey, setInfoWindowKey] = useState<number>(0);
    const { stations } = useFetchStations();
    const mapRef = useRef<GoogleMapType | null>(null);
    const hasSelectedStation = useRef<boolean>(false);

    // Initialize with Google Maps API
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    const defaultPosition = { lat: -31.2744, lng: 140.7751 };

    // Save map reference when loaded
    const onMapLoad = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (map: any) => {
            mapRef.current = map;
        },
        []
    );

    useEffect(() => {
        if (selectedStation && mapRef.current) {
            mapRef.current.panTo(selectedStation.position);

            // Wait for the pan to complete, then adjust for InfoWindow
            setTimeout(() => {
                if (mapRef.current) {
                    // Adjust the map to account for the InfoWindow
                    // Move map slightly up and left to center the InfoWindow
                    const latLng = new window.google.maps.LatLng(
                        selectedStation.position.lat - 0.03, // Move map view up
                        selectedStation.position.lng - 0.05 // Move map view left
                    );
                    mapRef.current.panTo(latLng);
                }
            }, 100);
        }
    }, [selectedStation]);

    // Handle marker click
    const handleMarkerClick = (station: Station) => {
        if (selectedStation && selectedStation.id === station.id) {
            setSelectedStation(null);

            // Force re-render by changing key and reopening after a small delay
            setTimeout(() => {
                setInfoWindowKey((prev) => prev + 1);
                setSelectedStation(station);
            }, 10);
        } else {
            // Normal case - different station
            setInfoWindowKey((prev) => prev + 1);
            setSelectedStation(station);
        }

        // Mark that we've selected a station
        hasSelectedStation.current = true;
    };

    const handleInfoWindowClose = () => {
        setSelectedStation(null);

        // Only pan to default position if we've never selected a station
        if (!hasSelectedStation.current && mapRef.current) {
            mapRef.current.panTo(defaultPosition);
        }
    };

    if (loadError) return <div>Error loading maps</div>;

    if (!isLoaded) return <div>Loading maps...</div>;

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={6}
                center={defaultPosition}
                options={mapOptions}
                onLoad={onMapLoad}
            >
                <MapContent
                    stations={stations}
                    handleMarkerClick={handleMarkerClick}
                />

                {selectedStation && (
                    <StationInfoWindow
                        key={`info-window-${selectedStation.id}-${infoWindowKey}`}
                        selectedStation={selectedStation}
                        handleInfoWindowClose={handleInfoWindowClose}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

export default LoadGoogleMap;
