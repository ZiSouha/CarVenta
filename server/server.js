import express from "express";
import "dotenv/config";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./configs/db.js";
import { initSocket } from "./socket.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

// Routes
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import damageReportRouter from "./routes/damageReportRoutes.js";

// Initialize Express App & HTTP Server
const app = express();
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

// Connect Database
await connectDB();

// Global Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

// Reconnection check only if disconnected
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState !== 1 && process.env.MONGODB_URI) {
        await connectDB();
    }
    next();
});

// Rate limiting for API routes
app.use('/api', apiLimiter);

// Health check and root route
app.get('/', (req, res) => res.json({ status: "online", message: "CarVenta API server is operational" }));

app.get('/api/status', async (req, res) => {
    let connectError = null;
    if (mongoose.connection.readyState !== 1 && process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: 'car-rental',
                serverSelectionTimeoutMS: 5000,
            });
        } catch (err) {
            connectError = "Database connection error";
        }
    }
    res.json({
        server: "online",
        hasMongoUri: Boolean(process.env.MONGODB_URI),
        mongoConnected: mongoose.connection.readyState === 1,
        mongoState: mongoose.connection.readyState === 1 ? "Connected" : (mongoose.connection.readyState === 2 ? "Connecting" : "Disconnected"),
        connectError
    });
});

// Mount Routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/damage-reports', damageReportRouter);
app.use('/uploads', express.static('uploads'));

// Start Server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`CarVenta server running on port ${PORT}`));
