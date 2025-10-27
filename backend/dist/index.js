"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const therapist_routes_1 = __importDefault(require("./routes/therapist.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const env_1 = require("./config/env");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: env_1.env.CORS_ORIGIN,
        credentials: true,
    },
});
exports.io = io;
app.use((0, cors_1.default)({
    origin: env_1.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'Fisioku Backend API is running',
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/patients', patient_routes_1.default);
app.use('/api/therapists', therapist_routes_1.default);
app.use('/api/bookings', booking_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
app.use(errorHandler_middleware_1.errorHandler);
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('join_booking', (bookingId) => {
        socket.join(`booking:${bookingId}`);
        console.log(`Socket ${socket.id} joined booking:${bookingId}`);
    });
    socket.on('send_message', (data) => {
        io.to(`booking:${data.bookingId}`).emit('new_message', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
app.set('io', io);
const PORT = env_1.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Environment: ${env_1.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
//# sourceMappingURL=index.js.map