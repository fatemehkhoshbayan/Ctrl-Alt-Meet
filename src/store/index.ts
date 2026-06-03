import { configureStore } from '@reduxjs/toolkit';
import { eventsReducer } from './events';
import { categoriesReducer } from './categories';
import { bookingsReducer } from './bookings';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    categories: categoriesReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
