import api from './api';
import { ApiResponse, Patient } from '../types';

interface UpdatePatientData {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  medicalHistory?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const patientService = {
  getProfile: async (): Promise<ApiResponse<Patient>> => {
    return api.get('/patients/profile');
  },

  updateProfile: async (data: UpdatePatientData): Promise<ApiResponse<Patient>> => {
    return api.put('/patients/profile', data);
  },

  changePassword: async (data: ChangePasswordData): Promise<ApiResponse<void>> => {
    return api.post('/auth/change-password', data);
  },
};
