"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const database_1 = __importDefault(require("../config/database"));
const client_1 = require("@prisma/client");
class PaymentService {
    static async uploadPaymentProof(data) {
        const payment = await database_1.default.payment.findUnique({
            where: { bookingId: data.bookingId },
            include: {
                booking: {
                    include: {
                        patient: true,
                    },
                },
            },
        });
        if (!payment) {
            throw new Error('Payment not found');
        }
        if (payment.status === client_1.PaymentStatus.VERIFIED) {
            throw new Error('Payment already verified');
        }
        const updatedPayment = await database_1.default.payment.update({
            where: { bookingId: data.bookingId },
            data: {
                paymentProof: data.paymentProof,
                method: data.method,
                status: client_1.PaymentStatus.PAID,
            },
            include: {
                booking: true,
            },
        });
        const admins = await database_1.default.user.findMany({
            where: { role: 'ADMIN', isActive: true },
        });
        for (const admin of admins) {
            await database_1.default.notification.create({
                data: {
                    userId: admin.id,
                    title: 'Payment Proof Uploaded',
                    message: `Payment proof uploaded for booking ${data.bookingId}`,
                    type: 'PAYMENT',
                    data: { bookingId: data.bookingId, paymentId: payment.id },
                },
            });
        }
        return updatedPayment;
    }
    static async verifyPayment(paymentId, adminId, notes) {
        const payment = await database_1.default.payment.findUnique({
            where: { id: paymentId },
            include: {
                booking: {
                    include: {
                        patient: true,
                    },
                },
            },
        });
        if (!payment) {
            throw new Error('Payment not found');
        }
        if (payment.status === client_1.PaymentStatus.VERIFIED) {
            throw new Error('Payment already verified');
        }
        const updatedPayment = await database_1.default.payment.update({
            where: { id: paymentId },
            data: {
                status: client_1.PaymentStatus.VERIFIED,
                verifiedAt: new Date(),
                verifiedBy: adminId,
                notes,
            },
            include: {
                booking: true,
            },
        });
        await database_1.default.booking.update({
            where: { id: payment.bookingId },
            data: { status: client_1.BookingStatus.PAID },
        });
        await database_1.default.notification.create({
            data: {
                userId: payment.booking.patient.userId,
                title: 'Payment Verified',
                message: 'Your payment has been verified successfully',
                type: 'PAYMENT',
                data: { bookingId: payment.bookingId, paymentId: payment.id },
            },
        });
        return updatedPayment;
    }
    static async rejectPayment(paymentId, adminId, notes) {
        const payment = await database_1.default.payment.findUnique({
            where: { id: paymentId },
            include: {
                booking: {
                    include: {
                        patient: true,
                    },
                },
            },
        });
        if (!payment) {
            throw new Error('Payment not found');
        }
        const updatedPayment = await database_1.default.payment.update({
            where: { id: paymentId },
            data: {
                status: client_1.PaymentStatus.FAILED,
                notes,
                verifiedBy: adminId,
                verifiedAt: new Date(),
            },
            include: {
                booking: true,
            },
        });
        await database_1.default.notification.create({
            data: {
                userId: payment.booking.patient.userId,
                title: 'Payment Rejected',
                message: `Your payment has been rejected. Reason: ${notes}`,
                type: 'PAYMENT',
                data: { bookingId: payment.bookingId, paymentId: payment.id },
            },
        });
        return updatedPayment;
    }
    static async getPaymentByBookingId(bookingId) {
        const payment = await database_1.default.payment.findUnique({
            where: { bookingId },
            include: {
                booking: {
                    include: {
                        patient: true,
                        therapist: true,
                    },
                },
            },
        });
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    }
    static async getPendingPayments(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [payments, total] = await Promise.all([
            database_1.default.payment.findMany({
                where: { status: client_1.PaymentStatus.PAID },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    booking: {
                        include: {
                            patient: true,
                            therapist: true,
                        },
                    },
                },
            }),
            database_1.default.payment.count({ where: { status: client_1.PaymentStatus.PAID } }),
        ]);
        return {
            payments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map