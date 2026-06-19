import { clients, HttpError } from '../clients';
import favoritesEndpoint from './favorites.endpoint';
import type { IFavorite, TCreateFavoritePayload } from './favorites.type';

const favoritesServices = {
  getFavoritesByUserId: (userId: string) => {
    try {
      return clients<IFavorite[]>(favoritesEndpoint.favoritesByUserId(userId), {
        method: 'GET',
      });
    } catch (error) {
      // json-server may return 404 when a user has no favorites yet
      if (error instanceof HttpError && error.status === 404) {
        return [];
      }
      throw error;
    }
  },
  addFavorite: (payload: TCreateFavoritePayload) =>
    clients<IFavorite>(favoritesEndpoint.favorites, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  removeFavorite: (id: string) =>
    clients<IFavorite>(favoritesEndpoint.favoriteById(id), { method: 'DELETE' }),
};

export default favoritesServices;
