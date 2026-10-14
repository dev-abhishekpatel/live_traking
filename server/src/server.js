import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/index.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'School bus tracking API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);

  socket.on('driver-location', (payload) => {
    io.emit('location-update', payload);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected:', socket.id);
  });
});

connectDB();

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
