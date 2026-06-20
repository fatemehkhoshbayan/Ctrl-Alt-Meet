import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import favoritesServices from './favorites.services';
import queryKeys from '../enums';
import type { IFavorite, TCreateFavoritePayload } from './favorites.type';
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
    onMutate: async payload => {
      const queryKey = [queryKeys.GET_FAVORITES_BY_USER_ID, payload.userId];

      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<IFavorite[]>(queryKey);

      queryClient.setQueryData<IFavorite[]>(queryKey, old => [
        ...(old ?? []),
        { id: `optimistic-${payload.eventId}`, ...payload },
      ]);

      return { previous, queryKey };
    },
    onSuccess: () => {
      toast.success('Successfully added to favorites!');
    },
    onError: (error, _payload, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(context.queryKey, context.previous);
      }
      toast.error(`Failed to add favorite: ${error.message ?? 'Unknown error'}`);
    },
    onSettled: (_data, _error, payload) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID, payload.userId],
      });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.REMOVE_FAVORITE],
    mutationFn: (id: string) => favoritesServices.removeFavorite(id),
    onMutate: async favoriteId => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID] });

      const snapshots = queryClient.getQueriesData<IFavorite[]>({
        queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID],
      });

      queryClient.setQueriesData<IFavorite[]>(
        { queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID] },
        old => (old ?? []).filter(favorite => favorite.id !== favoriteId),
      );

      return { snapshots };
    },
    onSuccess: () => {
      toast.success('Successfully removed from favorites!');
    },
    onError: (error, _id, context) => {
      context?.snapshots.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error(`Failed to remove favorite: ${error.message ?? 'Unknown error'}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_FAVORITES_BY_USER_ID] });
    },
  });
}
