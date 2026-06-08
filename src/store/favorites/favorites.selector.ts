import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

const selectFavoritesItems = (state: RootState) => state.favorites.items;

export const selectFavoriteEventIds = createSelector(selectFavoritesItems, items =>
  items.map(f => f.eventId),
);

export const selectIsEventFavorited = (eventId: string) =>
  createSelector(selectFavoritesItems, items => items.some(f => f.eventId === eventId));
