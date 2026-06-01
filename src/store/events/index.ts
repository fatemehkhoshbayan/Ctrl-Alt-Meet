export { default as eventsReducer } from './events.slice';
export { default as eventDetailsReducer } from './eventDetails.slice';
export {
  fetchEvents,
  setFilters,
  resetFilters,
  setPage,
  DEFAULT_FILTERS,
  PER_PAGE,
} from './events.slice';
export type { EventFilters } from './events.slice';
export { selectFilteredEvents } from './events.selector';
