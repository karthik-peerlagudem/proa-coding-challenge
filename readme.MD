# Weather Stations Monitoring Platform

## Overview

This project is a real-time weather monitoring system that displays data from various Australian weather stations on an interactive map. Users can view station locations, access real-time measurements, and analyze weather patterns across different regions of Australia.

The application consists of a React-based frontend with Google Maps integration and a Node.js backend with a SQLite database for storing station and measurement data.

## Features

-   **Interactive Map**: Displays all weather stations with clickable markers
-   **Real-time Data**: Shows latest measurements for each station including:
    -   Air temperature
    -   Solar irradiance
    -   Wind speed and direction (where available)
-   **Station Details**: View detailed information about each weather station

## Technology Stack

### Frontend

-   React.js with TypeScript
-   Vite for fast development and building
-   Google Maps API for map visualization
-   React-Google-Maps/API for React integration
-   Custom hooks for data fetching

### Backend

-   Node.js with Express
-   TypeScript
-   Drizzle ORM for database interactions
-   SQLite for lightweight database storage
-   RESTful API design

### DevOps

-   Docker for containerization
-   Docker Compose for multi-container orchestration

## Getting Started

### Prerequisites

-   Node.js (v14+)
-   npm or yarn
-   Docker and Docker Compose (for containerized deployment)
-   Google Maps API key

### Environment Setup

Create a `.env` file in the `frontend` directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Create a `.env` file in the `backend` directory:

```env
PORT=3001
DATABASE_URL=file:weather.db
```

### Local Development

**Start the Backend:**

```bash
cd backend
npm install
npm run db:seed # Seed the database with sample data
npm run dev
```

**Start the Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3002](http://localhost:3002) to view the application.

### Docker Deployment

To deploy the entire application using Docker:

```bash
# Build and start all containers
docker-compose up -d

# To view logs
docker-compose logs -f
```

The application will be available at [http://localhost:3002](http://localhost:3002).

## API Endpoints

### Stations

-   `GET /api/stations` - Get all weather stations

### Measurements

-   `GET /api/measurement/:stationId` - Get latest measurements for a station

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── db/          # Database models and schema
│   │   ├── handler/     # Request handlers
│   │   ├── lib/         # utility functions
│   │   ├── server.ts    # server express server
│   │   ├── routes.ts    # API routes
│   │   └── index.ts     # Entry point
│   ├── scripts/         # Database scripts
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   └── App.tsx      # Main App component
│   ├── public/          # Static assets
│   └── Dockerfile
└── docker-compose.yml
```

## Data Model

The database includes the following tables:

-   **Stations**: Weather station information (location, name, portfolio)
-   **Variables**: Measurement types for each station
-   **Measurements**: Actual measurement values with timestamps
