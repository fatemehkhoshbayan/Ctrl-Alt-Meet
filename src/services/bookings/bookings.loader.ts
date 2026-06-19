import { queryClient } from '@/lib';
import { getStoredUser } from '@/context';
import { eventsQueryOptions } from '../events/events.queries';
import { bookingsByUserIdQueryOptions } from './bookings.queries';
import type { MyBookingsLoaderData } from './bookings.type';

export async function myBookingsLoader(): Promise<MyBookingsLoaderData> {
  const user = getStoredUser();
  const events = await queryClient.ensureQueryData(eventsQueryOptions());

  const bookings = user?.id
    ? await queryClient.ensureQueryData(bookingsByUserIdQueryOptions(user.id))
    : [];

  return { events, bookings };
}
