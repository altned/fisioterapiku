// For Android Emulator (use this for testing)
export const API_URL = 'http://10.0.2.2:5000/api';

// For iOS Simulator (uncomment if testing on iOS)
// export const API_URL = 'http://localhost:5000/api';

// For Physical Device (uncomment and replace with your computer's IP)
// export const API_URL = 'http://192.168.1.XXX:5000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  PATIENT: {
    PROFILE: '/patients/profile',
    BOOKINGS: '/patients/bookings',
  },
  THERAPIST: {
    LIST: '/therapists',
    DETAIL: (id: string) => `/therapists/${id}`,
  },
  BOOKING: {
    CREATE: '/bookings',
    LIST: '/bookings',
    DETAIL: (id: string) => `/bookings/${id}`,
    UPDATE_STATUS: (id: string) => `/bookings/${id}/status`,
  },
  PAYMENT: {
    UPLOAD_PROOF: '/payments/upload-proof',
    BY_BOOKING: (bookingId: string) => `/payments/booking/${bookingId}`,
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@fisioku:accessToken',
  REFRESH_TOKEN: '@fisioku:refreshToken',
  USER: '@fisioku:user',
  ONBOARDING_DONE: '@fisioku:onboardingDone',
};

export const APP_CONFIG = {
  name: 'Fisioku',
  version: '1.0.0',
  apiTimeout: 30000,
};
