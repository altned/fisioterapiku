import { PaymentMethod } from '@prisma/client';
interface UploadPaymentProofData {
    bookingId: string;
    paymentProof: string;
    method: PaymentMethod;
}
export declare class PaymentService {
    static uploadPaymentProof(data: UploadPaymentProofData): Promise<{
        booking: {
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
        };
    } & {
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
    }>;
    static verifyPayment(paymentId: string, adminId: string, notes?: string): Promise<{
        booking: {
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
        };
    } & {
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
    }>;
    static rejectPayment(paymentId: string, adminId: string, notes: string): Promise<{
        booking: {
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
        };
    } & {
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
    }>;
    static getPaymentByBookingId(bookingId: string): Promise<{
        booking: {
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
                bidang: string[];
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
        };
    } & {
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
    }>;
    static getPendingPayments(page?: number, limit?: number): Promise<{
        payments: ({
            booking: {
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
                    bidang: string[];
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
            };
        } & {
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
export {};
//# sourceMappingURL=payment.service.d.ts.map