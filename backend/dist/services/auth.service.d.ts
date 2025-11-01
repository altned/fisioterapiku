import { UserRole } from '@prisma/client';
interface RegisterData {
    email: string;
    password: string;
    role: UserRole;
    name: string;
    phone: string;
}
interface LoginData {
    email: string;
    password: string;
}
export declare class AuthService {
    static register(data: RegisterData): Promise<{
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    static login(data: LoginData): Promise<{
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            profile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string;
                dateOfBirth: Date | null;
                gender: string | null;
                address: string | null;
                medicalHistory: string | null;
                emergencyContact: import("@prisma/client/runtime/library").JsonValue | null;
                profileImage: string | null;
                userId: string;
            } | {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string;
                profileImage: string | null;
                userId: string;
                bidang: string[];
                experience: number;
                rating: number;
                reviewCount: number;
                location: string | null;
                pricePerSession: number;
                bio: string | null;
                qualifications: string[];
                isAvailable: boolean;
            } | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    static refreshToken(token: string): Promise<{
        accessToken: string;
    }>;
    static getProfile(userId: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        isActive: boolean;
        emailVerified: boolean;
        createdAt: Date;
        patient: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string;
            dateOfBirth: Date | null;
            gender: string | null;
            address: string | null;
            medicalHistory: string | null;
            emergencyContact: import("@prisma/client/runtime/library").JsonValue | null;
            profileImage: string | null;
            userId: string;
        } | null;
        therapist: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string;
            profileImage: string | null;
            userId: string;
            bidang: string[];
            experience: number;
            rating: number;
            reviewCount: number;
            location: string | null;
            pricePerSession: number;
            bio: string | null;
            qualifications: string[];
            isAvailable: boolean;
        } | null;
    }>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map