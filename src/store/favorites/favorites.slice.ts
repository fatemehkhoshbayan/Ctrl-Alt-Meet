import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { favoritesApi } from '@/services';
import type { IFavorite } from '@/services';
import type { RootState } from '@/store';

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

export type ToggleFavoritePayload = {
  userId: string;
  eventId: string;
};

export const fetchFavorites = createAsyncThunk('favorites/fetchAll', (userId: string) =>
  favoritesApi.getByUserId(userId),
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggle',
  async ({ userId, eventId }: ToggleFavoritePayload, { getState }) => {
    const match = (getState() as RootState).favorites.items.find(f => f.eventId === eventId);

    if (match) {
      await favoritesApi.remove(match.id);
      return { action: 'removed' as const, favorite: match };
    }

    const created = await favoritesApi.create({ userId, eventId });
    return { action: 'added' as const, favorite: created };
  },
);

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
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load favorites';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { action: toggleAction, favorite } = action.payload;
        if (toggleAction === 'added') {
          state.items.push(favorite);
        } else {
          state.items = state.items.filter(f => f.id !== favorite.id);
        }
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
