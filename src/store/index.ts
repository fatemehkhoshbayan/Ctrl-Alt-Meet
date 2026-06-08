import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './categories';
import { bookingsReducer } from './bookings';
import { eventDetailsReducer, eventsReducer } from './events';
import { speakersReducer } from './speakers';
import { favoritesReducer } from './favorites';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    categories: categoriesReducer,
    bookings: bookingsReducer,
    speakers: speakersReducer,
    eventDetails: eventDetailsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
