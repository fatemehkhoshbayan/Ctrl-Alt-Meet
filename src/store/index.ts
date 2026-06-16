import { configureStore } from '@reduxjs/toolkit';
import { bookingsReducer } from './bookings';
import { eventsReducer } from './events';
import { favoritesReducer } from './favorites';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    bookings: bookingsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
