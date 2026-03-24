
import express from 'express';
import { getToday, getLive, getFixture, getOdds, getPrediction } from '../controllers/footballController.js';

const router = express.Router();
router.get('/today', getToday);
router.get('/live', getLive);
router.get('/fixtures/:id', getFixture);
router.get('/odds/:id', getOdds);
router.get('/pred/:id', getPrediction);
export default router;
