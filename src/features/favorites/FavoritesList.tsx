import { useMemo } from 'react';
import { Star } from 'lucide-react';

import { EventCard } from '@/features';
import { EmptyState } from '@/shared';
import { useAuth } from '@/hooks';
import { useFavoritesByUserId, type IEvent } from '@/services';

interface IFavoritesListProps {
  events: IEvent[];
}

export default function FavoritesList({ events }: IFavoritesListProps) {
  const { user } = useAuth();
  const { data: favorites = [] } = useFavoritesByUserId(user?.id);

  const favoriteEvents = useMemo(() => {
    const idSet = new Set(favorites.map(favorite => favorite.eventId));
    return events.filter(event => idSet.has(event.id));
  }, [events, favorites]);

  return (
    <section className="px-margin-mobile md:px-margin-desktop mx-auto min-h-[35vh] max-w-7xl py-16">
      {favoriteEvents.length === 0 && (
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
      {favoriteEvents.length > 0 && (
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
