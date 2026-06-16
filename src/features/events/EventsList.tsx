import { useMemo } from 'react';
import { SearchX, CalendarOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getFilteredEvents, setFilters, setPage, resetFilters } from '@/store/events';
import { Select, Pagination, Button } from '@/ui';
import { EmptyState, ErrorState, LoadingState } from '@/shared';
import { useEventsQuery, EVENTS_PER_PAGE, DEFAULT_EVENT_FILTERS } from '@/services';
import SideBar from './SideBar';
import EventCard from './EventCard';
import { SORT_OPTIONS } from './constant';

export default function EventsList() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(state => state.events.currentPage);
  const filters = useAppSelector(state => state.events.filters);
  const sortBy = filters.sortBy;

  const { data: events = [], isLoading, isError, error, isSuccess } = useEventsQuery();

  const { items, totalItems, totalPages } = useMemo(
    () => getFilteredEvents(events, filters, currentPage),
    [events, filters, currentPage],
  );

  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.categories.length > 0 ||
    filters.dateRange !== 'anytime' ||
    filters.priceMin > DEFAULT_EVENT_FILTERS.priceMin ||
    filters.priceMax < DEFAULT_EVENT_FILTERS.priceMax;

  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * EVENTS_PER_PAGE + 1;
  const rangeEnd = Math.min(currentPage * EVENTS_PER_PAGE, totalItems);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section className="gap-gutter grid grid-cols-12 justify-center px-20 py-16 lg:px-0">
      <SideBar className="col-span-3 min-w-80" />

      <div className="col-span-12 lg:col-span-9">
        <div className="flex items-center justify-between gap-3 pb-8 lg:mb-0">
          <div className="flex items-center justify-between gap-3">
            <p className="font-body-md text-body-md text-on-surface-variant">
              {isSuccess
                ? `Showing ${rangeStart}–${rangeEnd} of ${totalItems} tech events`
                : 'Loading events…'}
            </p>
          </div>
          <Select
            id="sorting"
            label="Sort by:"
            options={SORT_OPTIONS}
            value={sortBy}
            onChangeOption={val => dispatch(setFilters({ sortBy: val }))}
          />
        </div>

        {isLoading && <LoadingState message="Loading events..." />}

        {isError && <ErrorState error={error?.message} />}

        {isSuccess && items.length === 0 && (
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

        {isSuccess && items.length > 0 && (
          <div className="gap-gutter grid grid-cols-1 lg:min-w-3xl lg:grid-cols-2">
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
