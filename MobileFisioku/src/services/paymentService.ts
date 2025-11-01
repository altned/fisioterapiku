import api from './api';
import { ApiResponse, Payment } from '../types';

export const paymentService = {
  uploadPaymentProof: async (
    bookingId: string,
    method: 'BANK_TRANSFER' | 'QRIS',
    paymentProof: string
  ): Promise<ApiResponse<Payment>> => {
    return api.post('/payments/upload-proof', {
      bookingId,
      method,
      paymentProof,
    });
  },

  getPaymentByBookingId: async (bookingId: string): Promise<ApiResponse<Payment>> => {
    return api.get(`/payments/booking/${bookingId}`);
  },
};
