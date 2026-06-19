import { Suspense, use } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FavoritesHeroSection, FavoritesList } from '@/features';
import { LoadingState } from '@/shared';
import type { FavoritesLoaderData } from '@/services';

export default function Favorites() {
  const { events, favorites } = useLoaderData() as FavoritesLoaderData;

  return (
    <>
      <FavoritesHeroSection />
      <Suspense fallback={<LoadingState message="Loading favorites..." />}>
        <FavoritesList events={events} favorites={use(favorites)} />
      </Suspense>
    </>
  );
}
