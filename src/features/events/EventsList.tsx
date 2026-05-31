import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Select, Pagination } from '@/ui';
import { fetchEvents, selectFilteredEvents, setFilters, setPage, PER_PAGE } from '@/store/events';
import SideBar from './SideBar';
import EventCard from './EventCard';
import { SORT_OPTIONS } from './constant';

export default function EventsList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.events.status);
  const error = useAppSelector(state => state.events.error);
  const currentPage = useAppSelector(state => state.events.currentPage);
  const { items, totalItems, totalPages } = useAppSelector(selectFilteredEvents);
  const sortBy = useAppSelector(state => state.events.filters.sortBy);

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

        {status === 'loading' && (
          <div className="flex items-center justify-center py-24">
            <p className="text-on-surface-variant animate-pulse">Loading events...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="flex items-center justify-center py-24">
            <p className="text-error">{error}</p>
          </div>
        )}

        {status === 'succeeded' && (
          <div className="gap-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
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
