export interface User {
  id: string;
  email: string;
  role: 'PATIENT' | 'THERAPIST' | 'ADMIN';
}

export interface Patient {
  id: string;
  userId: string;
  name: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  medicalHistory?: string;
  emergencyContact?: EmergencyContact;
  profileImage?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Therapist {
  id: string;
  userId: string;
  name: string;
  phone: string;
  bidang: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  location?: string;
  pricePerSession: number;
  bio?: string;
  qualifications: string[];
  profileImage?: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  patientId: string;
  therapistId: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  complaint: string;
  medicalHistory?: string;
  status: BookingStatus;
  therapist?: Therapist;
  payment?: Payment;
}

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: 'BANK_TRANSFER' | 'QRIS';
  status: 'PENDING' | 'PAID' | 'VERIFIED' | 'FAILED';
  paymentProof?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
    profile?: Patient | Therapist;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role: 'PATIENT';
  name: string;
  phone: string;
}

export interface Consent {
  id: string;
  bookingId: string;
  patientId: string;
  consentVersion: string;
  consentText: string;
  isAgreed: boolean;
  agreedAt?: string;
  ipAddress?: string;
  deviceInfo?: string;
  agreeExamination: boolean;
  agreeProcedure: boolean;
  agreeRisks: boolean;
  agreeDataUsage: boolean;
  agreeEmergency: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConsentCheckboxes {
  agreeExamination: boolean;
  agreeProcedure: boolean;
  agreeRisks: boolean;
  agreeDataUsage: boolean;
  agreeEmergency: boolean;
}

export interface ConsentText {
  version: string;
  text: string;
}
