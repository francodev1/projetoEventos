import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { paymentRoutes } from './routes/payment.routes';
import { eventRoutes } from './routes/event.routes';
import { authRoutes } from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/events', eventRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Fonte Church API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
});

export default app;
