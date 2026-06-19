import { queryOptions } from '@tanstack/react-query';
import favoritesServices from './favorites.services';
import queryKeys from '../enums';

const FAVORITES_STALE_TIME = 30_000;

export const favoritesByUserIdQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID, userId],
    queryFn: () => favoritesServices.getFavoritesByUserId(userId),
    staleTime: FAVORITES_STALE_TIME,
  });
