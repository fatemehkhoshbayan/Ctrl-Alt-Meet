import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { eventsApi } from '@/services';
import type { IEvent } from '@/services';
import { purchaseTicket } from '../bookings/bookings.slice';

interface EventDetailsState {
  event: IEvent;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventDetailsState = {
  event: {} as IEvent,
  status: 'idle',
  error: null,
};

export const fetchEventDetails = createAsyncThunk('events/fetchDetails', (id: string) =>
  eventsApi.getById(id),
);

const eventDetailsSlice = createSlice({
  name: 'eventDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEventDetails.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.event = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load events';
      })
      .addCase(purchaseTicket.fulfilled, (state, action) => {
        state.event = {
          ...state.event,
          ticketTiers: action.payload.event.ticketTiers,
        };
      });
  },
});

export default eventDetailsSlice.reducer;
