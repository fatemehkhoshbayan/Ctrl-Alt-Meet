import type { EventFilters, EventsState } from './events.type';

export const EVENTS_PER_PAGE = 6;

export const DEFAULT_EVENT_FILTERS: EventFilters = {
  categories: [],
  dateRange: 'anytime',
  priceMin: 0,
  priceMax: 2000,
  sortBy: 'most-popular',
  searchQuery: '',
};

export const INITIAL_EVENTS_STATE: EventsState = {
  currentPage: 1,
  filters: DEFAULT_EVENT_FILTERS,
};
