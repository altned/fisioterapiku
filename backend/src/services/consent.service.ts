import { PrismaClient, Consent } from '@prisma/client';
import { CONSENT_TEXT, CONSENT_VERSION } from '../constants/consentText';

const prisma = new PrismaClient();

interface CreateConsentData {
  bookingId: string;
  patientId: string;
}

interface AgreeConsentData {
  agreeExamination: boolean;
  agreeProcedure: boolean;
  agreeRisks: boolean;
  agreeDataUsage: boolean;
  agreeEmergency: boolean;
  ipAddress?: string;
  deviceInfo?: string;
}

export class ConsentService {
  /**
   * Create a new consent record for a booking
   */
  static async createConsent(data: CreateConsentData): Promise<Consent> {
    // Check if consent already exists
    const existing = await prisma.consent.findUnique({
      where: { bookingId: data.bookingId },
    });

    if (existing) {
      throw new Error('Consent already exists for this booking');
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Create consent
    const consent = await prisma.consent.create({
      data: {
        bookingId: data.bookingId,
        patientId: data.patientId,
        consentVersion: CONSENT_VERSION,
        consentText: CONSENT_TEXT,
      },
    });

    return consent;
  }

  /**
   * Get consent by booking ID
   */
  static async getConsentByBookingId(bookingId: string): Promise<Consent | null> {
    return prisma.consent.findUnique({
      where: { bookingId },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        booking: {
          select: {
            id: true,
            appointmentDate: true,
            appointmentTime: true,
            therapist: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Get current consent text and version
   */
  static getCurrentConsentText(): { version: string; text: string } {
    return {
      version: CONSENT_VERSION,
      text: CONSENT_TEXT,
    };
  }

  /**
   * Agree to consent - update all checkboxes and mark as agreed
   */
  static async agreeConsent(
    consentId: string,
    data: AgreeConsentData
  ): Promise<Consent> {
    // Verify all checkboxes are true
    const allAgreed =
      data.agreeExamination &&
      data.agreeProcedure &&
      data.agreeRisks &&
      data.agreeDataUsage &&
      data.agreeEmergency;

    if (!allAgreed) {
      throw new Error('All consent checkboxes must be agreed to proceed');
    }

    // Get consent
    const consent = await prisma.consent.findUnique({
      where: { id: consentId },
    });

    if (!consent) {
      throw new Error('Consent not found');
    }

    if (consent.isAgreed) {
      throw new Error('Consent has already been agreed to');
    }

    // Update consent
    const updated = await prisma.consent.update({
      where: { id: consentId },
      data: {
        agreeExamination: data.agreeExamination,
        agreeProcedure: data.agreeProcedure,
        agreeRisks: data.agreeRisks,
        agreeDataUsage: data.agreeDataUsage,
        agreeEmergency: data.agreeEmergency,
        isAgreed: true,
        agreedAt: new Date(),
        ipAddress: data.ipAddress,
        deviceInfo: data.deviceInfo,
      },
    });

    // Update booking to mark consent as complete
    await prisma.booking.update({
      where: { id: consent.bookingId },
      data: { hasConsent: true },
    });

    return updated;
  }

  /**
   * Validate that consent is complete for a booking
   */
  static async validateConsentForBooking(bookingId: string): Promise<boolean> {
    const consent = await prisma.consent.findUnique({
      where: { bookingId },
    });

    if (!consent) {
      return false;
    }

    return consent.isAgreed;
  }

  /**
   * Get patient's consent history
   */
  static async getPatientConsents(patientId: string): Promise<Consent[]> {
    return prisma.consent.findMany({
      where: { patientId },
      include: {
        booking: {
          select: {
            id: true,
            appointmentDate: true,
            appointmentTime: true,
            therapist: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
