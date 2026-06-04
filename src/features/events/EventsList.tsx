import { useEffect } from 'react';
import { SearchX, CalendarOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Select, Pagination, Button } from '@/ui';
import { EmptyState, ErrorState, LoadingState } from '@/shared';
import {
  fetchEvents,
  selectFilteredEvents,
  setFilters,
  setPage,
  resetFilters,
  PER_PAGE,
} from '@/store/events';
import SideBar from './SideBar';
import EventCard from './EventCard';
import { SORT_OPTIONS } from './constant';

export default function EventsList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.events.status);
  const error = useAppSelector(state => state.events.error);
  const currentPage = useAppSelector(state => state.events.currentPage);
  const { items, totalItems, totalPages } = useAppSelector(selectFilteredEvents);
  const filters = useAppSelector(state => state.events.filters);
  const sortBy = filters.sortBy;

  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.categories.length > 0 ||
    filters.dateRange !== 'anytime' ||
    filters.priceMax !== 2000;

  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1;
  const rangeEnd = Math.min(currentPage * PER_PAGE, totalItems);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section className="gap-gutter grid grid-cols-12 justify-center py-16">
      <SideBar className="col-span-3" />

      <div className="col-span-9">
        <div className="mb-8 flex items-end justify-between">
          <p className="font-body-md text-body-md text-on-surface-variant">
            {status === 'succeeded'
              ? `Showing ${rangeStart}–${rangeEnd} of ${totalItems} tech events`
              : 'Loading events…'}
          </p>
          <Select
            id="sorting"
            label="Sort by:"
            options={SORT_OPTIONS}
            value={sortBy}
            onChangeOption={val => dispatch(setFilters({ sortBy: val }))}
          />
        </div>

        {status === 'loading' && <LoadingState message="Loading events..." />}

        {status === 'failed' && <ErrorState error={error ?? undefined} />}

        {status === 'succeeded' && items.length === 0 && (
          <EmptyState
            icon={
              hasActiveFilters ? (
                <SearchX size={48} className="text-primary" />
              ) : (
                <CalendarOff size={48} className="text-primary" />
              )
            }
            title={hasActiveFilters ? 'No events match your filters' : 'No events yet'}
            message={
              hasActiveFilters
                ? "Try adjusting your search or filters to find what you're looking for."
                : 'Check back soon for upcoming tech events.'
            }
          >
            {hasActiveFilters && (
              <Button
                variant="filled"
                size="md"
                BtnText="Clear filters"
                onClick={() => dispatch(resetFilters())}
              />
            )}
          </EmptyState>
        )}

        {status === 'succeeded' && items.length > 0 && (
          <div className="gap-gutter grid min-w-3xl grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {items.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </div>
    </section>
  );
}
