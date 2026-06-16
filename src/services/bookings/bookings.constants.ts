import type { BookingsState } from './bookings.type';

export const INITIAL_BOOKINGS_STATE: BookingsState = {
  purchaseStatus: 'idle',
  error: null,
  bookingSuccess: null,
};
