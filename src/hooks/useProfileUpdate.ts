import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { useAuth } from '@/hooks';
import { useUpdateProfile, type IUser, type TUpdateUserPayload } from '@/services';
import { getInitials } from '@/utils';

function normalizeOptionalString(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function useProfileUpdate(initialUser: IUser) {
  const { updateUser } = useAuth();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const [user, setUser] = useState(initialUser);
  const [prevInitialUser, setPrevInitialUser] = useState(initialUser);

  if (initialUser !== prevInitialUser) {
    setPrevInitialUser(initialUser);
    setUser(initialUser);
  }

  const saveProfile = useCallback(
    async (payload: TUpdateUserPayload, message = 'Profile updated') => {
      try {
        const patch: TUpdateUserPayload = { ...payload };

        if (patch.name) {
          patch.avatar = getInitials(patch.name);
        }

        if ('about' in patch) {
          patch.about = normalizeOptionalString(patch.about);
        }

        if ('imageUrl' in patch) {
          patch.imageUrl = normalizeOptionalString(patch.imageUrl);
        }

        if (patch.preferences?.preferredCategory === '') {
          patch.preferences = { ...patch.preferences, preferredCategory: undefined };
        }

        const updated = await updateProfile({ id: user.id, payload: patch });
        setUser(updated);
        updateUser(updated);
        toast.success(message);
        return updated;
      } catch {
        return null;
      }
    },
    [updateProfile, updateUser, user.id],
  );

  return {
    user,
    saveProfile,
    isSaving: isPending,
  };
}
