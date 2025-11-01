import api from './api';
import { ApiResponse, Booking } from '../types';

interface CreateBookingData {
  therapistId: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  complaint: string;
  medicalHistory?: string;
}

export const bookingService = {
  createBooking: async (data: CreateBookingData): Promise<ApiResponse<Booking>> => {
    return api.post('/bookings', data);
  },

  getMyBookings: async (): Promise<ApiResponse<Booking[]>> => {
    return api.get('/bookings/my-bookings');
  },

  getBookingById: async (id: string): Promise<ApiResponse<Booking>> => {
    return api.get(`/bookings/${id}`);
  },

  cancelBooking: async (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`/bookings/${id}`);
  },
};
