import { useLoaderData } from 'react-router-dom';
import { FavoritesHeroSection, FavoritesList } from '@/features';
import type { FavoritesLoaderData } from '@/services';

export default function Favorites() {
  const { events } = useLoaderData() as FavoritesLoaderData;

  return (
    <>
      <FavoritesHeroSection />
      <FavoritesList events={events} />
    </>
  );
}
