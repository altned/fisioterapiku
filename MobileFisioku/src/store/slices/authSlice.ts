import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { User, Patient, LoginCredentials, RegisterData } from '../../types';

interface AuthState {
  user: User | null;
  profile: Patient | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const isAuth = await authService.isAuthenticated();
  return isAuth;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.user.id,
          email: action.payload.user.email,
          role: action.payload.user.role as 'PATIENT' | 'THERAPIST' | 'ADMIN',
        };
        state.profile = action.payload.user.profile as Patient;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.user.id,
          email: action.payload.user.email,
          role: action.payload.user.role as 'PATIENT' | 'THERAPIST' | 'ADMIN',
        };
        state.profile = action.payload.user.profile as Patient;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
