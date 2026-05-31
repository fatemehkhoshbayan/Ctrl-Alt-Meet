export { default as eventsReducer } from './eventsSlice';
export {
  fetchEvents,
  setFilters,
  resetFilters,
  setPage,
  DEFAULT_FILTERS,
  PER_PAGE,
} from './eventsSlice';
export type { EventFilters } from './eventsSlice';
export { selectFilteredEvents } from './eventsSelector';
