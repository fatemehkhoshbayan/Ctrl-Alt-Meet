import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_EVENT_FILTERS, INITIAL_EVENTS_STATE, type EventFilters } from '@/services';

const eventsSlice = createSlice({
  name: 'events',
  initialState: INITIAL_EVENTS_STATE,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<EventFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    resetFilters(state) {
      state.filters = DEFAULT_EVENT_FILTERS;
      state.currentPage = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setPage } = eventsSlice.actions;
export default eventsSlice.reducer;
