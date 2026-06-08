import { clients } from '../clients';
import type { IFavorite, TCreateFavoritePayload } from './favorites.type';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchFavoritesByUserId(userId: string): Promise<IFavorite[]> {
  const response = await fetch(
    `${BASE_URL}/favorites?userId=${encodeURIComponent(userId)}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );

  // json-server may return 404 when a user has no favorites yet
  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<IFavorite[]>;
}

export const favoritesApi = {
  getByUserId: fetchFavoritesByUserId,
  create: (payload: TCreateFavoritePayload) =>
    clients<IFavorite>('/favorites', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    clients<IFavorite>(`/favorites/${id}`, { method: 'DELETE' }),
};
