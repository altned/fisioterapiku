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
export declare class BookingService {
    static createBooking(data: CreateBookingData): Promise<{
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
        };
        therapist: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicalHistory: string | null;
        location: string;
        patientId: string;
        therapistId: string;
        appointmentDate: Date;
        appointmentTime: string;
        complaint: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }>;
    static getBookingById(id: string): Promise<{
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
        };
        therapist: {
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
        };
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            notes: string | null;
            bookingId: string;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
            paymentProof: string | null;
            verifiedAt: Date | null;
            verifiedBy: string | null;
        } | null;
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date | null;
            endTime: Date | null;
            bookingId: string;
            duration: number | null;
            therapistNotes: string | null;
            progressReport: string | null;
            exercisePlan: string | null;
            documents: string[];
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicalHistory: string | null;
        location: string;
        patientId: string;
        therapistId: string;
        appointmentDate: Date;
        appointmentTime: string;
        complaint: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }>;
    static getBookingsByPatient(patientId: string, page?: number, limit?: number): Promise<{
        bookings: ({
            therapist: {
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
            };
            payment: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.PaymentStatus;
                notes: string | null;
                bookingId: string;
                amount: number;
                method: import(".prisma/client").$Enums.PaymentMethod;
                paymentProof: string | null;
                verifiedAt: Date | null;
                verifiedBy: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            medicalHistory: string | null;
            location: string;
            patientId: string;
            therapistId: string;
            appointmentDate: Date;
            appointmentTime: string;
            complaint: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            notes: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    static getBookingsByTherapist(therapistId: string, page?: number, limit?: number): Promise<{
        bookings: ({
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
            };
            payment: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.PaymentStatus;
                notes: string | null;
                bookingId: string;
                amount: number;
                method: import(".prisma/client").$Enums.PaymentMethod;
                paymentProof: string | null;
                verifiedAt: Date | null;
                verifiedBy: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            medicalHistory: string | null;
            location: string;
            patientId: string;
            therapistId: string;
            appointmentDate: Date;
            appointmentTime: string;
            complaint: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            notes: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    static updateBookingStatus(id: string, status: BookingStatus, _userId: string): Promise<{
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
        };
        therapist: {
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
        };
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            notes: string | null;
            bookingId: string;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
            paymentProof: string | null;
            verifiedAt: Date | null;
            verifiedBy: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicalHistory: string | null;
        location: string;
        patientId: string;
        therapistId: string;
        appointmentDate: Date;
        appointmentTime: string;
        complaint: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }>;
    static cancelBooking(id: string, _userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicalHistory: string | null;
        location: string;
        patientId: string;
        therapistId: string;
        appointmentDate: Date;
        appointmentTime: string;
        complaint: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }>;
}
export {};
//# sourceMappingURL=booking.service.d.ts.map