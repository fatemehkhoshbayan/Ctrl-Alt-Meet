import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { eventsApi } from '@/services';
import type { IEvent } from '@/services';

interface EventsState {
  event: IEvent;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  purchaseStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventsState = {
  event: {} as IEvent,
  status: 'idle',
  purchaseStatus: 'idle',
  error: null,
};

export const fetchEventDetails = createAsyncThunk('events/fetchDetails', (id: string) =>
  eventsApi.getById(id),
);

export const purchaseTicket = createAsyncThunk(
  'events/purchaseTicket',
  async ({ event, tierId }: { event: IEvent; tierId: string }) => {
    const updatedTiers = event.ticketTiers.map(t =>
      t.id === tierId ? { ...t, available: Math.max(0, t.available - 1) } : t,
    );
    return eventsApi.purchaseTicket(event.id, updatedTiers);
  },
);

const eventDefaultsSlice = createSlice({
  name: 'eventDetails',
  initialState,
  reducers: {
    resetPurchaseStatus(state) {
      state.purchaseStatus = 'idle';
    },
  },
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
      .addCase(purchaseTicket.pending, state => {
        state.purchaseStatus = 'loading';
      })
      .addCase(purchaseTicket.fulfilled, (state, action) => {
        state.purchaseStatus = 'succeeded';
        state.event = action.payload;
      })
      .addCase(purchaseTicket.rejected, state => {
        state.purchaseStatus = 'failed';
      });
  },
});

export const { resetPurchaseStatus } = eventDefaultsSlice.actions;
export default eventDefaultsSlice.reducer;
