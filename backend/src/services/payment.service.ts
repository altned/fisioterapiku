import prisma from '../config/database';
import { PaymentStatus, PaymentMethod, BookingStatus } from '@prisma/client';

interface UploadPaymentProofData {
  bookingId: string;
  paymentProof: string;
  method: PaymentMethod;
}

export class PaymentService {
  static async uploadPaymentProof(data: UploadPaymentProofData) {
    const payment = await prisma.payment.findUnique({
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

    if (payment.status === PaymentStatus.VERIFIED) {
      throw new Error('Payment already verified');
    }

    const updatedPayment = await prisma.payment.update({
      where: { bookingId: data.bookingId },
      data: {
        paymentProof: data.paymentProof,
        method: data.method,
        status: PaymentStatus.PAID,
      },
      include: {
        booking: true,
      },
    });

    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN', isActive: true },
    });

    for (const admin of admins) {
      await prisma.notification.create({
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

  static async verifyPayment(paymentId: string, adminId: string, notes?: string) {
    const payment = await prisma.payment.findUnique({
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

    if (payment.status === PaymentStatus.VERIFIED) {
      throw new Error('Payment already verified');
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.VERIFIED,
        verifiedAt: new Date(),
        verifiedBy: adminId,
        notes,
      },
      include: {
        booking: true,
      },
    });

    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: BookingStatus.PAID },
    });

    await prisma.notification.create({
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

  static async rejectPayment(paymentId: string, adminId: string, notes: string) {
    const payment = await prisma.payment.findUnique({
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

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.FAILED,
        notes,
        verifiedBy: adminId,
        verifiedAt: new Date(),
      },
      include: {
        booking: true,
      },
    });

    await prisma.notification.create({
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

  static async getPaymentByBookingId(bookingId: string) {
    const payment = await prisma.payment.findUnique({
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

  static async getPendingPayments(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: { status: PaymentStatus.PAID },
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
      prisma.payment.count({ where: { status: PaymentStatus.PAID } }),
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
