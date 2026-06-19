import { createSlice } from '@reduxjs/toolkit';
import type { IFavorite } from '@/services';

interface FavoritesState {
  items: IFavorite[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
