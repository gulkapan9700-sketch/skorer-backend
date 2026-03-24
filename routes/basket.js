
import express from 'express';
import { getToday, getLive, getFixture } from '../controllers/basketController.js';

const router = express.Router();
router.get('/today', getToday);
router.get('/live', getLive);
router.get('/fixtures/:id', getFixture);
export default router;
