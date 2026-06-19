import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import favoritesServices from './favorites.services';
import queryKeys from '../enums';
import type { TCreateFavoritePayload } from './favorites.type';

const FAVORITES_STALE_TIME = 30_000;

export function useFavoritesByUserIdQuery(userId: string) {
  return useQuery({
    queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID, userId],
    queryFn: () => favoritesServices.getFavoritesByUserId(userId),
    staleTime: FAVORITES_STALE_TIME,
  });
}

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADD_FAVORITE],
    mutationFn: (payload: TCreateFavoritePayload) => favoritesServices.addFavorite(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID] });
    },
    onError: error => {
      toast.error(`Failed to add favorite: ${error.message ?? 'Unknown error'}`);
    },
  });
}

export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.REMOVE_FAVORITE],
    mutationFn: (id: string) => favoritesServices.removeFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID] });
    },
    onError: error => {
      toast.error(`Failed to remove favorite: ${error.message ?? 'Unknown error'}`);
    },
  });
}
