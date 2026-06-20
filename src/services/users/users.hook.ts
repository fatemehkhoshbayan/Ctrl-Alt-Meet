import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usersServices from './users.services';
import queryKeys from '../enums';
import type { TUpdateUserPayload } from './users.type';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.UPDATE_USER],
    mutationFn: ({ id, payload }: { id: string; payload: TUpdateUserPayload }) =>
      usersServices.update(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_USER_BY_ID, id] });
    },
    onError: error => {
      toast.error(`Failed to update profile: ${error.message ?? 'Unknown error'}`);
    },
  });
}
