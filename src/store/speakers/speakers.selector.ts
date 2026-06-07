import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

const selectAllSpeakers = (state: RootState) => state.speakers.items;

export const selectSpeakersByIds = (ids: string[] | undefined) =>
  createSelector(selectAllSpeakers, speakers => {
    if (!ids?.length) return [];
    return speakers.filter(speaker => ids.includes(speaker.id));
  });
