"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TherapistService = void 0;
const database_1 = __importDefault(require("../config/database"));
class TherapistService {
    static async getAllTherapists(filter, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const where = {};
        if (filter.specialization) {
            where.bidang = {
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
            database_1.default.therapist.findMany({
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
            database_1.default.therapist.count({ where }),
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
    static async getTherapistById(id) {
        const therapist = await database_1.default.therapist.findUnique({
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
    static async updateTherapist(id, data) {
        const therapist = await database_1.default.therapist.findUnique({
            where: { id },
        });
        if (!therapist) {
            throw new Error('Therapist not found');
        }
        const updatedTherapist = await database_1.default.therapist.update({
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
    static async setAvailability(therapistId, availability) {
        await database_1.default.availability.deleteMany({
            where: { therapistId },
        });
        const createdAvailability = await database_1.default.availability.createMany({
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
    static async getAvailability(therapistId) {
        const availability = await database_1.default.availability.findMany({
            where: { therapistId, isActive: true },
            orderBy: { dayOfWeek: 'asc' },
        });
        return availability;
    }
}
exports.TherapistService = TherapistService;
//# sourceMappingURL=therapist.service.js.map