const BASE_FAVORITES_URL = '/favorites';

const favoritesEndpoint = {
  favorites: BASE_FAVORITES_URL,
  favoriteById: (favoriteId: string) => `${BASE_FAVORITES_URL}/${favoriteId}`,
  favoritesByUserId: (userId: string) =>
    `${BASE_FAVORITES_URL}?userId=${encodeURIComponent(userId)}`,
};

export default favoritesEndpoint;
