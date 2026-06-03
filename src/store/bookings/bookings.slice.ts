import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookingsApi } from '@/services';
import type { IBooking } from '@/services';

interface BookingsState {
  items: IBooking[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookingsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchBookings = createAsyncThunk('bookings/fetchAll', () => bookingsApi.getAll());

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBookings.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load bookings';
      });
  },
});

export default bookingsSlice.reducer;
