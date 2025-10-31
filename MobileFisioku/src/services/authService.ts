import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { ENDPOINTS, STORAGE_KEYS } from '../constants/config';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ApiResponse,
} from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
    
    if (response.success && response.data) {
      await this.saveTokens(response.data);
    }
    
    return response;
  },

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
    
    if (response.success && response.data) {
      await this.saveTokens(response.data);
    }
    
    return response;
  },

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER,
    ]);
  },

  async getProfile(): Promise<ApiResponse> {
    return await api.get(ENDPOINTS.AUTH.PROFILE);
  },

  async saveTokens(authData: AuthResponse): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authData.accessToken);
    await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authData.user));
  },

  async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  },
};
