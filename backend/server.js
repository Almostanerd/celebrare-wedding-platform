import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import inviteRoutes from './routes/inviteRoutes.js';
import rsvpRoutes from './routes/rsvpRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

app.use('/api/invites', inviteRoutes);
app.use('/api/invites', rsvpRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Celebrare Invitation Backend API', time: new Date() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[Celebrare Server] Running on http://localhost:${PORT}`);
});