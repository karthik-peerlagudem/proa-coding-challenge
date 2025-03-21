import request from 'supertest';
import app from '../src/server';

describe('Station API tests', () => {
    describe('GET /api/station', () => {
        it('should return all stations', async () => {
            const response = await request(app)
                .get('/api/station')
                .expect('Content-Type', `application/json; charset=utf-8`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBeTruthy();
        });

        it('should include required station properties', async () => {
            const response = await request(app).get('/api/station').expect(200);

            const station = response.body.data[0];
            expect(station).toHaveProperty('id');
            expect(station).toHaveProperty('ws_name');
            expect(station).toHaveProperty('site');
            expect(station).toHaveProperty('portfolio');
            expect(station).toHaveProperty('state');
            expect(station).toHaveProperty('latitude');
            expect(station).toHaveProperty('longitude');
        });
    });

    describe('GET /api/measurement/:stationId', () => {
        it('should return measurements for a station', async () => {
            const response = await request(app)
                .get('/api/measurement/1')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBeTruthy();
        });

        it('should include required measurement properties', async () => {
            const response = await request(app)
                .get('/api/measurement/1')
                .expect(200);

            const measurement = response.body.data[0];
            expect(measurement).toHaveProperty('value');
            expect(measurement).toHaveProperty('timestamp');
            expect(measurement).toHaveProperty('variableName');
            expect(measurement).toHaveProperty('longName');
            expect(measurement).toHaveProperty('unit');
        });

        it('should return 404 for non-existent station', async () => {
            const response = await request(app)
                .get('/api/measurement/999')
                .expect(404);
            expect(response.body).toHaveProperty('error', 'Station not found');
        });

        it('should return empty array for station with no measurements', async () => {
            const stationId = 2;

            const response = await request(app)
                .get(`/api/measurement/${stationId}`)
                .expect(200);

            expect(response.body.data).toEqual([]);
        });
    });

    describe('Error Handling', () => {
        it('should handle invalid station ID format', async () => {
            const response = await request(app)
                .get('/api/stations/invalid')
                .expect(404);
            expect(response.body).toHaveProperty('error', 'Invalid route');
        });
    });
});
