import { Router } from 'express';
import { retrieveMeasurement, retrieveStation } from './handler/station';

const router = Router();

router.get('/station', retrieveStation);
router.get('/measurement/:stationId', retrieveMeasurement);

export default router;
