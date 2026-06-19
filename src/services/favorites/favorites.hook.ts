import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import favoritesServices from './favorites.services';
import queryKeys from '../enums';
import type { TCreateFavoritePayload } from './favorites.type';
import { favoritesByUserIdQueryOptions } from './favorites.queries';

export function useFavoritesByUserId(userId: string | undefined) {
  return useQuery({
    ...favoritesByUserIdQueryOptions(userId!),
    enabled: Boolean(userId),
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADD_FAVORITE],
    mutationFn: (payload: TCreateFavoritePayload) => favoritesServices.addFavorite(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID] });
      toast.success('Successfully added to favorites!');
    },
    onError: error => {
      toast.error(`Failed to add favorite: ${error.message ?? 'Unknown error'}`);
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.REMOVE_FAVORITE],
    mutationFn: (id: string) => favoritesServices.removeFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID] });
      toast.success('Successfully removed from favorites!');
    },
    onError: error => {
      toast.error(`Failed to remove favorite: ${error.message ?? 'Unknown error'}`);
    },
  });
}
