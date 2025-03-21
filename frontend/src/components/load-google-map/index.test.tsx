/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoadGoogleMap from './index';

// Mock the Google Maps JavaScript API
const mockGoogle = {
    maps: {
        Map: jest.fn(),
        LatLng: jest.fn().mockImplementation((lat, lng) => ({ lat, lng })),
        Marker: jest.fn().mockImplementation(() => ({
            setMap: jest.fn(),
            addListener: jest.fn(),
        })),
        InfoWindow: jest.fn().mockImplementation(() => ({
            setContent: jest.fn(),
            open: jest.fn(),
            close: jest.fn(),
        })),
        Size: jest.fn().mockImplementation((width, height) => ({
            width,
            height,
            equals: jest.fn(),
            toString: () => `${width}x${height}`,
        })),
    },
};

// Mock MapContent component
jest.mock('./MapContent', () => ({
    __esModule: true,
    default: ({ stations, onMarkerClick }: any) => (
        <div data-testid="map-content">
            {stations.map((station: any) => (
                <div
                    key={station.id}
                    data-testid="map-marker"
                    onClick={() => onMarkerClick(station)}
                >
                    {station.ws_name}
                </div>
            ))}
        </div>
    ),
}));

// Mock useLoadScript hook
jest.mock('@react-google-maps/api', () => ({
    useLoadScript: () => ({
        isLoaded: true,
        loadError: null,
    }),
    GoogleMap: ({ children, onLoad }: any) => (
        <div data-testid="google-map">
            {children}
            {onLoad && onLoad(mockGoogle.maps.Map)}
        </div>
    ),
}));

// Mock useFetchStations hook
jest.mock('../../hook/useFetchStations', () => ({
    __esModule: true,
    default: () => ({
        stations: [
            {
                id: 1,
                ws_name: 'Test Station',
                site: 'Test Site',
                portfolio: 'Test Portfolio',
                state: 'NSW',
                position: { lat: -33.865143, lng: 151.2099 },
            },
        ],
    }),
}));

describe('LoadGoogleMap Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Setup window.google
        global.window.google = mockGoogle as any;

        // Reset useLoadScript mock to default state
        jest.spyOn(
            require('@react-google-maps/api'),
            'useLoadScript'
        ).mockImplementation(() => ({
            isLoaded: true,
            loadError: null,
        }));
    });

    it('renders without crashing', () => {
        render(<LoadGoogleMap selectedState="All" />);
        expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('displays loading state when map is not loaded', () => {
        // Override the mock for this specific test
        jest.spyOn(
            require('@react-google-maps/api'),
            'useLoadScript'
        ).mockImplementation(() => ({
            isLoaded: false,
            loadError: null,
        }));

        render(<LoadGoogleMap selectedState="All" />);
        expect(screen.getByText(/loading maps/i)).toBeInTheDocument();
    });

    it('filters stations based on selected state', async () => {
        const { rerender } = render(<LoadGoogleMap selectedState="NSW" />);

        // Wait for the map to load
        await screen.findByTestId('google-map');
        expect(screen.getByTestId('map-content')).toBeInTheDocument();

        // Verify NSW station is visible
        expect(screen.getByText('Test Station')).toBeInTheDocument();

        // Re-render with different state
        rerender(<LoadGoogleMap selectedState="VIC" />);

        // Verify map is still present
        expect(screen.getByTestId('google-map')).toBeInTheDocument();

        // Verify no stations are shown for VIC
        expect(screen.queryByText('Test Station')).not.toBeInTheDocument();
    });
});
