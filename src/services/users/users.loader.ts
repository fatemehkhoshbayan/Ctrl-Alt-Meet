import { redirect } from 'react-router-dom';
import { queryClient } from '@/lib';
import { getStoredUser } from '@/context';
import { userByIdQueryOptions } from './users.queries';
import type { ProfileLoaderData } from './users.type';

export async function profileLoader(): Promise<ProfileLoaderData> {
  const storedUser = getStoredUser();

  if (!storedUser?.id) {
    throw redirect('/login');
  }

  const user = await queryClient.ensureQueryData(userByIdQueryOptions(storedUser.id));

  return { user };
}
