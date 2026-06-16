import { useMemo } from 'react';
import { Star } from 'lucide-react';

import { EventCard } from '@/features';
import { EmptyState, ErrorState, LoadingState } from '@/shared';
import { useAuth } from '@/hooks';
import { useEventsQuery } from '@/services';
import { useAppSelector } from '@/store/hooks';
import { selectFavoriteEventIds } from '@/store/favorites';

export default function FavoritesList() {
  const { user } = useAuth();

  const {
    data: events = [],
    isLoading: eventsLoading,
    isError: eventsIsError,
    error: eventsError,
  } = useEventsQuery();

  const { status: favoritesStatus, error: favoritesError } = useAppSelector(
    state => state.favorites,
  );

  const favoriteEventIds = useAppSelector(selectFavoriteEventIds);

  const favoriteEvents = useMemo(() => {
    const idSet = new Set(favoriteEventIds);
    return events.filter(event => idSet.has(event.id));
  }, [events, favoriteEventIds]);

  const isLoading = eventsLoading || favoritesStatus === 'loading';
  const error = eventsIsError ? (eventsError?.message ?? 'Failed to load events') : favoritesError;

  return (
    <section className="px-margin-mobile md:px-margin-desktop mx-auto max-w-7xl py-16">
      {isLoading && <LoadingState message="Loading favorites..." />}
      {error && <ErrorState error={error} />}
      {!isLoading && !error && favoriteEvents.length === 0 && (
        <EmptyState
          icon={<Star size={48} className="text-tertiary fill-tertiary" />}
          title="No favorites yet"
          message={
            user
              ? 'Star events from the Events page to build your shortlist.'
              : 'Sign in to save your favorite events.'
          }
        />
      )}
      {!isLoading && !error && favoriteEvents.length > 0 && (
        <>
          <p className="text-on-surface-variant font-body-md text-body-md mb-8">
            {favoriteEvents.length} saved event{favoriteEvents.length !== 1 ? 's' : ''}
          </p>
          <div className="gap-gutter grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {favoriteEvents.map(event => (
              <EventCard key={event.id} event={event} variant="compact" />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
