import prisma from '../config/database';
import { BookingStatus } from '@prisma/client';

interface CreateBookingData {
  patientId: string;
  therapistId: string;
  appointmentDate: Date;
  appointmentTime: string;
  location: string;
  complaint: string;
  medicalHistory?: string;
}

export class BookingService {
  static async createBooking(data: CreateBookingData) {
    const therapist = await prisma.therapist.findUnique({
      where: { id: data.therapistId },
    });

    if (!therapist) {
      throw new Error('Therapist not found');
    }

    if (!therapist.isAvailable) {
      throw new Error('Therapist is not available');
    }

    const booking = await prisma.booking.create({
      data: {
        patientId: data.patientId,
        therapistId: data.therapistId,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        location: data.location,
        complaint: data.complaint,
        medicalHistory: data.medicalHistory,
        status: BookingStatus.PENDING,
      },
      include: {
        patient: true,
        therapist: true,
      },
    });

    await prisma.notification.create({
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

  static async getBookingById(id: string) {
    const booking = await prisma.booking.findUnique({
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

  static async getBookingsByPatient(patientId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where: { patientId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          therapist: true,
          payment: true,
        },
      }),
      prisma.booking.count({ where: { patientId } }),
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

  static async getBookingsByTherapist(therapistId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where: { therapistId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: true,
          payment: true,
        },
      }),
      prisma.booking.count({ where: { therapistId } }),
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

  static async updateBookingStatus(id: string, status: BookingStatus, _userId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        patient: true,
        therapist: true,
      },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        patient: true,
        therapist: true,
        payment: true,
      },
    });

    await prisma.notification.create({
      data: {
        userId: booking.patient.userId,
        title: 'Booking Status Updated',
        message: `Your booking status has been updated to ${status}`,
        type: 'BOOKING',
        data: { bookingId: booking.id, status },
      },
    });

    if (status === BookingStatus.CONFIRMED) {
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amount: booking.therapist.pricePerSession,
          method: 'BANK_TRANSFER',
          status: 'PENDING',
        },
      });

      await prisma.booking.update({
        where: { id },
        data: { status: BookingStatus.PAYMENT_PENDING },
      });
    }

    return updatedBooking;
  }

  static async cancelBooking(id: string, _userId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        patient: true,
        therapist: true,
      },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
    });

    return updatedBooking;
  }
}
