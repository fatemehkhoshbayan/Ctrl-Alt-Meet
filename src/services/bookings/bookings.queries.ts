import { queryOptions } from '@tanstack/react-query';
import bookingsServices from './bookings.services';
import queryKeys from '../enums';

const BOOKINGS_STALE_TIME = 60_000;
const BOOKINGS_GC_TIME = 60_000;

export const bookingsByUserIdQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [queryKeys.GET_BOOKINGS_BY_USER_ID, userId],
    queryFn: () => bookingsServices.getBookingsByUserId(userId),
    staleTime: BOOKINGS_STALE_TIME,
    gcTime: BOOKINGS_GC_TIME,
  });
