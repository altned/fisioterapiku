import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PatientService {
  static async getPatientByUserId(userId: string) {
    return await prisma.patient.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
      },
    });
  }

  static async getPatientById(patientId: string) {
    return await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
      },
    });
  }

  static async updatePatient(userId: string, data: any) {
    const patient = await prisma.patient.findUnique({
      where: { userId },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    return await prisma.patient.update({
      where: { userId },
      data: {
        name: data.name,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        address: data.address,
        medicalHistory: data.medicalHistory,
        emergencyContact: data.emergencyContact,
        profileImage: data.profileImage,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
      },
    });
  }

  static async getPatientBookings(patientId: string) {
    return await prisma.booking.findMany({
      where: { patientId },
      include: {
        therapist: {
          select: {
            id: true,
            name: true,
            specialization: true,
            profileImage: true,
            rating: true,
          },
        },
        payment: true,
        session: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getBookingById(bookingId: string, patientId: string) {
    return await prisma.booking.findFirst({
      where: {
        id: bookingId,
        patientId,
      },
      include: {
        therapist: {
          select: {
            id: true,
            name: true,
            specialization: true,
            profileImage: true,
            rating: true,
            phone: true,
          },
        },
        payment: true,
        session: true,
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  static async getAllPatients() {
    return await prisma.patient.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
