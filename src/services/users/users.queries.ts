import { queryOptions } from '@tanstack/react-query';
import usersServices from './users.services';
import queryKeys from '../enums';

const USER_STALE_TIME = 60_000;

export const userByIdQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [queryKeys.GET_USER_BY_ID, userId],
    queryFn: () => usersServices.getById(userId),
    staleTime: USER_STALE_TIME,
  });
