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
export declare class TherapistService {
    static getAllTherapists(filter: TherapistFilter, page?: number, limit?: number): Promise<{
        therapists: ({
            user: {
                email: string;
                isActive: boolean;
            };
            availability: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                therapistId: string;
                dayOfWeek: number;
                startTime: string;
                endTime: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string;
            profileImage: string | null;
            userId: string;
            specialization: string[];
            experience: number;
            rating: number;
            reviewCount: number;
            location: string | null;
            pricePerSession: number;
            bio: string | null;
            qualifications: string[];
            isAvailable: boolean;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    static getTherapistById(id: string): Promise<{
        user: {
            email: string;
            isActive: boolean;
        };
        reviews: ({
            patient: {
                name: string;
                profileImage: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            patientId: string;
            therapistId: string;
            comment: string | null;
        })[];
        availability: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            therapistId: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        profileImage: string | null;
        userId: string;
        specialization: string[];
        experience: number;
        rating: number;
        reviewCount: number;
        location: string | null;
        pricePerSession: number;
        bio: string | null;
        qualifications: string[];
        isAvailable: boolean;
    }>;
    static updateTherapist(id: string, data: UpdateTherapistData): Promise<{
        user: {
            email: string;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        profileImage: string | null;
        userId: string;
        specialization: string[];
        experience: number;
        rating: number;
        reviewCount: number;
        location: string | null;
        pricePerSession: number;
        bio: string | null;
        qualifications: string[];
        isAvailable: boolean;
    }>;
    static setAvailability(therapistId: string, availability: any[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    static getAvailability(therapistId: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        therapistId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    }[]>;
}
export {};
//# sourceMappingURL=therapist.service.d.ts.map