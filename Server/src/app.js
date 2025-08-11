// src/app.js
import express from 'express';
import cors from 'cors';
import patientsRoutes from './routes/patients.routes.js';
import apptsRoutes from './routes/citas.routes.js';
import medicosRoutes from './routes/medicos.routes.js';
import medespeRoutes from './routes/medespe.routes.js';
import otrainfoRoutes from './routes/otrainfo.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/patients', patientsRoutes);
app.use('/appts', apptsRoutes);
app.use('/medicos', medicosRoutes);
app.use('/medespe', medespeRoutes);
app.use('/otrainfo', otrainfoRoutes);

export default app;
