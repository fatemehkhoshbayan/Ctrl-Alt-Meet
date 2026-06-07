import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { speakersApi } from '@/services';
import type { ISpeaker } from '@/services';

interface SpeakersState {
  items: ISpeaker[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SpeakersState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSpeakers = createAsyncThunk('speakers/fetchAll', () => speakersApi.getAll());

const speakersSlice = createSlice({
  name: 'speakers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSpeakers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSpeakers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSpeakers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load categories';
      });
  },
});

export default speakersSlice.reducer;
