import { queryClient } from '@/lib';
import { getStoredUser } from '@/context';
import { eventsQueryOptions } from '../events/events.queries';
import { favoritesByUserIdQueryOptions } from './favorites.queries';
import type { FavoritesLoaderData } from './favorites.type';

export async function favoritesLoader(): Promise<FavoritesLoaderData> {
  const user = getStoredUser();
  const events = await queryClient.ensureQueryData(eventsQueryOptions());

  const favorites = user?.id
    ? queryClient.ensureQueryData(favoritesByUserIdQueryOptions(user.id))
    : Promise.resolve([]);

  return { events, favorites };
}
