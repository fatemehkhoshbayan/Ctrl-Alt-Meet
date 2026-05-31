import type { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { DEFAULT_FILTERS, PER_PAGE } from './eventsSlice';
import { buildDateBounds } from '@/utils';

const selectAllItems = (state: RootState) => state.events.allItems;
const selectFilters = (state: RootState) => state.events.filters;
const selectCurrentPage = (state: RootState) => state.events.currentPage;

export const selectFilteredEvents = createSelector(
  [selectAllItems, selectFilters, selectCurrentPage],
  (allItems, filters, currentPage) => {
    let result = allItems;

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.trim().toLowerCase();
      result = result.filter(
        event =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query),
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter(event => filters.categories.includes(event.category));
    }

    if (filters.dateRange !== 'anytime') {
      const { start, end } = buildDateBounds(filters.dateRange);
      if (start) result = result.filter(event => event.date >= start);
      if (end) result = result.filter(event => event.date <= end);
    }

    if (filters.priceMax < DEFAULT_FILTERS.priceMax) {
      result = result.filter(event =>
        event.ticketTiers.some(tier => tier.price <= filters.priceMax),
      );
    }

    result = [...result].sort((a, b) => {
      if (filters.sortBy === 'most-popular') {
        return b.attendeeCount - a.attendeeCount;
      }
      if (filters.sortBy === 'date-soonest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      const minPriceA = Math.min(...a.ticketTiers.map(t => t.price));
      const minPriceB = Math.min(...b.ticketTiers.map(t => t.price));
      if (filters.sortBy === 'price-low-to-high') {
        return minPriceA - minPriceB;
      }
      return minPriceB - minPriceA;
    });

    const totalItems = result.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PER_PAGE;

    return {
      items: result.slice(start, start + PER_PAGE),
      totalItems,
      totalPages,
    };
  },
);
