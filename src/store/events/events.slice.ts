import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { eventsApi } from '@/services';
import type { IEvent } from '@/services';

export const PER_PAGE = 6;

export interface EventFilters {
  categories: string[];
  dateRange: string;
  priceMax: number;
  sortBy: string;
  searchQuery: string;
}

export const DEFAULT_FILTERS: EventFilters = {
  categories: [],
  dateRange: 'anytime',
  priceMax: 2000,
  sortBy: 'most-popular',
  searchQuery: '',
};

interface EventsState {
  allItems: IEvent[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  filters: EventFilters;
}

const initialState: EventsState = {
  allItems: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  filters: DEFAULT_FILTERS,
};

export const fetchEvents = createAsyncThunk('events/fetchAll', () => eventsApi.getAll());

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<EventFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    resetFilters(state) {
      state.filters = DEFAULT_FILTERS;
      state.currentPage = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allItems = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load events';
      });
  },
});

export const { setFilters, resetFilters, setPage } = eventsSlice.actions;
export default eventsSlice.reducer;
