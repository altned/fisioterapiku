export declare class PatientService {
    static getPatientByUserId(userId: string): Promise<({
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
        };
    } & {
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
    }) | null>;
    static getPatientById(patientId: string): Promise<({
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
        };
    } & {
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
    }) | null>;
    static updatePatient(userId: string, data: any): Promise<{
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
        };
    } & {
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
    }>;
    static getPatientBookings(patientId: string): Promise<({
        therapist: {
            id: string;
            name: string;
            profileImage: string | null;
            bidang: string[];
            rating: number;
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
        hasConsent: boolean;
    })[]>;
    static getBookingById(bookingId: string, patientId: string): Promise<({
        therapist: {
            id: string;
            name: string;
            phone: string;
            profileImage: string | null;
            bidang: string[];
            rating: number;
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
        messages: {
            id: string;
            createdAt: Date;
            isRead: boolean;
            bookingId: string;
            senderId: string;
            content: string;
            attachments: string[];
        }[];
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
        hasConsent: boolean;
    }) | null>;
    static getAllPatients(): Promise<({
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
        };
        _count: {
            bookings: number;
        };
    } & {
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
    })[]>;
}
//# sourceMappingURL=patient.service.d.ts.map