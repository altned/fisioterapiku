import api from './api';
import { ApiResponse, Consent, ConsentCheckboxes, ConsentText } from '../types';

export const consentService = {
  /**
   * Get current consent text
   */
  getConsentText: async (): Promise<ApiResponse<ConsentText>> => {
    return api.get('/consents/text');
  },

  /**
   * Create consent for a booking
   */
  createConsent: async (bookingId: string): Promise<ApiResponse<Consent>> => {
    return api.post('/consents', { bookingId });
  },

  /**
   * Get consent by booking ID
   */
  getConsentByBookingId: async (bookingId: string): Promise<ApiResponse<Consent>> => {
    return api.get(`/consents/booking/${bookingId}`);
  },

  /**
   * Agree to consent with all checkboxes
   */
  agreeConsent: async (
    consentId: string,
    checkboxes: ConsentCheckboxes
  ): Promise<ApiResponse<Consent>> => {
    return api.post(`/consents/${consentId}/agree`, checkboxes);
  },

  /**
   * Validate consent for a booking
   */
  validateConsent: async (bookingId: string): Promise<ApiResponse<{ isValid: boolean }>> => {
    return api.get(`/consents/validate/${bookingId}`);
  },

  /**
   * Get patient's consent history
   */
  getPatientConsents: async (patientId: string): Promise<ApiResponse<Consent[]>> => {
    return api.get(`/consents/patient/${patientId}`);
  },
};
