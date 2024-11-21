import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import tokenRoutes from './routes/tokenRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import { setupWebSocket } from './services/websocket.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use('/api/tokens', tokenRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);

// WebSocket setup
setupWebSocket(io);

// Error handling
app.use(errorHandler);

// Database connection
connectDB();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;