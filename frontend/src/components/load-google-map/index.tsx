import { useRef, useCallback, useState, useEffect } from 'react';
import {
    GoogleMap,
    GoogleMap as GoogleMapType,
    useLoadScript,
} from '@react-google-maps/api';

import StationInfoWindow from '../station-info-window';
import MapContent from './MapContent';

import useFetchStations, { Station } from '../../hook/useFetchStations';

/**
 * Google Maps API key from environment variables
 * @constant {string}
 */
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/** Validate required environment variables */
if (!apiKey) {
    throw new Error('VITE_GOOGLE_MAPS_API_KEY is required in .env file');
}

/**
 * Map container style configuration
 */
const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

/**
 * Google Maps options configuration
 * @constant {google.maps.MapOptions}
 */
const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
};

interface LoadGoogleMapProps {
    selectedState: string;
}

/**
 * LoadGoogleMap Component
 *
 * @component
 * @description Renders a Google Map with weather station markers and info windows
 *
 * @param {LoadGoogleMapProps} props - Component props
 * @param {string} props.selectedState - Selected state for filtering stations
 *
 */
const LoadGoogleMap = ({ selectedState }: LoadGoogleMapProps) => {
    const [selectedStation, setSelectedStation] = useState<Station | null>(
        null
    );
    const [infoWindowKey, setInfoWindowKey] = useState<number>(0);
    const mapRef = useRef<GoogleMapType | null>(null);
    const hasSelectedStation = useRef<boolean>(false);

    /** Load Google Maps script and handle initialization */
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    /** Fetch stations data using custom hook */
    const { stations } = useFetchStations();

    // Filter stations based on selected state
    const filteredStations = stations.filter((station) =>
        selectedState === 'All' ? true : station.state === selectedState
    );

    /** Default map center position */
    const defaultPosition = { lat: -31.2744, lng: 140.7751 };

    /**
     * Callback to store map reference when loaded
     * @param {google.maps.Map} map - Google Maps instance
     */
    const onMapLoad = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (map: any) => {
            mapRef.current = map;
        },
        []
    );

    /**
     * Effect to handle map position updates when station is selected
     */
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

    /**
     * Handles marker click events
     * @param {Station} station - The clicked station
     */
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

    /**
     * Handles info window close events
     */
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
                    stations={filteredStations}
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
