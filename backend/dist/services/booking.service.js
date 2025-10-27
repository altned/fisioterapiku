"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const database_1 = __importDefault(require("../config/database"));
const client_1 = require("@prisma/client");
class BookingService {
    static async createBooking(data) {
        const therapist = await database_1.default.therapist.findUnique({
            where: { id: data.therapistId },
        });
        if (!therapist) {
            throw new Error('Therapist not found');
        }
        if (!therapist.isAvailable) {
            throw new Error('Therapist is not available');
        }
        const booking = await database_1.default.booking.create({
            data: {
                patientId: data.patientId,
                therapistId: data.therapistId,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
                location: data.location,
                complaint: data.complaint,
                medicalHistory: data.medicalHistory,
                status: client_1.BookingStatus.PENDING,
            },
            include: {
                patient: true,
                therapist: true,
            },
        });
        await database_1.default.notification.create({
            data: {
                userId: therapist.userId,
                title: 'New Booking Request',
                message: `You have a new booking request from ${booking.patient.name}`,
                type: 'BOOKING',
                data: { bookingId: booking.id },
            },
        });
        return booking;
    }
    static async getBookingById(id) {
        const booking = await database_1.default.booking.findUnique({
            where: { id },
            include: {
                patient: true,
                therapist: true,
                payment: true,
                session: true,
            },
        });
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    }
    static async getBookingsByPatient(patientId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bookings, total] = await Promise.all([
            database_1.default.booking.findMany({
                where: { patientId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    therapist: true,
                    payment: true,
                },
            }),
            database_1.default.booking.count({ where: { patientId } }),
        ]);
        return {
            bookings,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    static async getBookingsByTherapist(therapistId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bookings, total] = await Promise.all([
            database_1.default.booking.findMany({
                where: { therapistId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    patient: true,
                    payment: true,
                },
            }),
            database_1.default.booking.count({ where: { therapistId } }),
        ]);
        return {
            bookings,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    static async updateBookingStatus(id, status, _userId) {
        const booking = await database_1.default.booking.findUnique({
            where: { id },
            include: {
                patient: true,
                therapist: true,
            },
        });
        if (!booking) {
            throw new Error('Booking not found');
        }
        const updatedBooking = await database_1.default.booking.update({
            where: { id },
            data: { status },
            include: {
                patient: true,
                therapist: true,
                payment: true,
            },
        });
        await database_1.default.notification.create({
            data: {
                userId: booking.patient.userId,
                title: 'Booking Status Updated',
                message: `Your booking status has been updated to ${status}`,
                type: 'BOOKING',
                data: { bookingId: booking.id, status },
            },
        });
        if (status === client_1.BookingStatus.CONFIRMED) {
            await database_1.default.payment.create({
                data: {
                    bookingId: booking.id,
                    amount: booking.therapist.pricePerSession,
                    method: 'BANK_TRANSFER',
                    status: 'PENDING',
                },
            });
            await database_1.default.booking.update({
                where: { id },
                data: { status: client_1.BookingStatus.PAYMENT_PENDING },
            });
        }
        return updatedBooking;
    }
    static async cancelBooking(id, _userId) {
        const booking = await database_1.default.booking.findUnique({
            where: { id },
            include: {
                patient: true,
                therapist: true,
            },
        });
        if (!booking) {
            throw new Error('Booking not found');
        }
        const updatedBooking = await database_1.default.booking.update({
            where: { id },
            data: { status: client_1.BookingStatus.CANCELLED },
        });
        return updatedBooking;
    }
}
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map