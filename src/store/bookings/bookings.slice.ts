import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_BOOKINGS_STATE, type BookingsState } from '@/services';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: INITIAL_BOOKINGS_STATE,
  reducers: {
    setPurchaseStatus(state, action: PayloadAction<BookingsState['purchaseStatus']>) {
      state.purchaseStatus = action.payload;
      if (action.payload !== 'failed') {
        state.error = null;
      }
    },
    setPurchaseError(state, action: PayloadAction<string>) {
      state.purchaseStatus = 'failed';
      state.error = action.payload;
    },
    resetPurchaseStatus(state) {
      state.purchaseStatus = 'idle';
      state.error = null;
    },
    clearBookingSuccess(state) {
      state.bookingSuccess = null;
    },
  },
});

export const { setPurchaseStatus, setPurchaseError, resetPurchaseStatus, clearBookingSuccess } =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
