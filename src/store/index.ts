import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './categories';
import { bookingsReducer } from './bookings';
import { eventDetailsReducer, eventsReducer } from './events';
import { speakersReducer } from './speakers';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    categories: categoriesReducer,
    bookings: bookingsReducer,
    speakers: speakersReducer,
    eventDetails: eventDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
