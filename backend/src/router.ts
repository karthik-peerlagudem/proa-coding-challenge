import { Router } from 'express';
import {
    retrieveMeasurement,
    retrieveStation,
    retrieveVariable,
} from './handler/station';

const router = Router();

router.get('/station', retrieveStation);
router.get('/variable', retrieveVariable);
router.get('/measurement', retrieveMeasurement);

export default router;
