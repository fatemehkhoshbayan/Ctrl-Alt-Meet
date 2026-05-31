import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './events/eventsSlice';
import categoriesReducer from './categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
