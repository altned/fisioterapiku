import api from './api';
import { ENDPOINTS } from '../constants/config';
import { Therapist, ApiResponse } from '../types';

export const therapistService = {
  async getTherapists(): Promise<ApiResponse<Therapist[]>> {
    return await api.get<Therapist[]>(ENDPOINTS.THERAPIST.LIST);
  },

  async getTherapistById(id: string): Promise<ApiResponse<Therapist>> {
    return await api.get<Therapist>(ENDPOINTS.THERAPIST.DETAIL(id));
  },
};
