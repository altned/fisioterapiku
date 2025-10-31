import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import therapistReducer from './slices/therapistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    therapist: therapistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
