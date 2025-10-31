import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { therapistService } from '../../services/therapistService';
import { Therapist } from '../../types';

interface TherapistState {
  therapists: Therapist[];
  selectedTherapist: Therapist | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TherapistState = {
  therapists: [],
  selectedTherapist: null,
  isLoading: false,
  error: null,
};

export const fetchTherapists = createAsyncThunk(
  'therapist/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await therapistService.getTherapists();
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTherapistById = createAsyncThunk(
  'therapist/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await therapistService.getTherapistById(id);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const therapistSlice = createSlice({
  name: 'therapist',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearSelectedTherapist: state => {
      state.selectedTherapist = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTherapists.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTherapists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.therapists = action.payload;
      })
      .addCase(fetchTherapists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTherapistById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTherapistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTherapist = action.payload;
      })
      .addCase(fetchTherapistById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedTherapist } = therapistSlice.actions;
export default therapistSlice.reducer;
