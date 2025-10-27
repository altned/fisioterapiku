import prisma from '../config/database';

interface TherapistFilter {
  specialization?: string;
  location?: string;
  minRating?: number;
  isAvailable?: boolean;
}

interface UpdateTherapistData {
  name?: string;
  phone?: string;
  specialization?: string[];
  experience?: number;
  location?: string;
  pricePerSession?: number;
  bio?: string;
  qualifications?: string[];
  profileImage?: string;
  isAvailable?: boolean;
}

export class TherapistService {
  static async getAllTherapists(filter: TherapistFilter, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter.specialization) {
      where.specialization = {
        has: filter.specialization,
      };
    }

    if (filter.location) {
      where.location = {
        contains: filter.location,
        mode: 'insensitive',
      };
    }

    if (filter.minRating) {
      where.rating = {
        gte: filter.minRating,
      };
    }

    if (filter.isAvailable !== undefined) {
      where.isAvailable = filter.isAvailable;
    }

    const [therapists, total] = await Promise.all([
      prisma.therapist.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          rating: 'desc',
        },
        include: {
          user: {
            select: {
              email: true,
              isActive: true,
            },
          },
          availability: true,
        },
      }),
      prisma.therapist.count({ where }),
    ]);

    return {
      therapists,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getTherapistById(id: string) {
    const therapist = await prisma.therapist.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            isActive: true,
          },
        },
        availability: true,
        reviews: {
          include: {
            patient: {
              select: {
                name: true,
                profileImage: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!therapist) {
      throw new Error('Therapist not found');
    }

    return therapist;
  }

  static async updateTherapist(id: string, data: UpdateTherapistData) {
    const therapist = await prisma.therapist.findUnique({
      where: { id },
    });

    if (!therapist) {
      throw new Error('Therapist not found');
    }

    const updatedTherapist = await prisma.therapist.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            email: true,
            isActive: true,
          },
        },
      },
    });

    return updatedTherapist;
  }

  static async setAvailability(therapistId: string, availability: any[]) {
    await prisma.availability.deleteMany({
      where: { therapistId },
    });

    const createdAvailability = await prisma.availability.createMany({
      data: availability.map((slot) => ({
        therapistId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isActive: slot.isActive ?? true,
      })),
    });

    return createdAvailability;
  }

  static async getAvailability(therapistId: string) {
    const availability = await prisma.availability.findMany({
      where: { therapistId, isActive: true },
      orderBy: { dayOfWeek: 'asc' },
    });

    return availability;
  }
}
