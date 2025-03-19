import { Router } from 'express';
import { retrieveStation } from './handler/station';

const router = Router();

router.get('/stations', retrieveStation);

export default router;
