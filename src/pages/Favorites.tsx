import { FavoritesHeroSection, FavoritesList, RequireAuth } from '@/features';

export default function Favorites() {
  return (
    <RequireAuth>
      <FavoritesHeroSection />
      <FavoritesList />
    </RequireAuth>
  );
}
