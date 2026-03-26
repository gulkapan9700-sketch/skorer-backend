import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import footballRoutes from './routes/football.js';
import basketRoutes from './routes/basket.js';

app.use('/fb', footballRoutes);
app.use('/bb', basketRoutes);

app.get('/', (req, res) => res.send('✅ SKORER Backend Çalışıyor'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('✅ Backend aktif PORT: ' + PORT));
