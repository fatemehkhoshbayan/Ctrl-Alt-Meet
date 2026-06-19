import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import bookingsServices from './bookings.services';
import queryKeys from '../enums';
import type { TCreateBookingPayload } from './bookings.type';
import { bookingsByUserIdQueryOptions } from './bookings.queries';

const BOOKINGS_STALE_TIME = 60_000;

export function useBookingsQuery() {
  return useQuery({
    queryKey: [queryKeys.GET_BOOKINGS],
    queryFn: bookingsServices.getBookings,
    staleTime: BOOKINGS_STALE_TIME,
  });
}

export function useBookingsByUserId(userId: string | undefined) {
  return useQuery({
    ...bookingsByUserIdQueryOptions(userId!),
    enabled: Boolean(userId),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.CREATE_BOOKING],
    mutationFn: (payload: TCreateBookingPayload) => bookingsServices.createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_BOOKINGS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_BOOKINGS_BY_USER_ID] });
    },
    onError: error => {
      toast.error(`Failed to create booking: ${error.message ?? 'Unknown error'}`);
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.CANCEL_BOOKING],
    mutationFn: (id: string) => bookingsServices.cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_BOOKINGS_BY_USER_ID] });
    },
    onError: error => {
      toast.error(`Failed to cancel booking: ${error.message ?? 'Unknown error'}`);
    },
  });
}
