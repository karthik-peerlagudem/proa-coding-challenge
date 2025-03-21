import { Router, Request, Response } from 'express';
import { retrieveMeasurement, retrieveStation } from './handler/station';

const router = Router();

// Station API routes
router.get('/station', retrieveStation);
router.get('/measurement/:stationId', retrieveMeasurement);

// 404 handler for invalid routes
router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Invalid route',
    });
});

export default router;
