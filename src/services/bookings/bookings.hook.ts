import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import bookingsServices from './bookings.services';
import queryKeys from '../enums';

const BOOKINGS_STALE_TIME = 60_000;

export function useBookingsQuery() {
  return useQuery({
    queryKey: [queryKeys.GET_BOOKINGS],
    queryFn: bookingsServices.getBookings,
    staleTime: BOOKINGS_STALE_TIME,
  });
}

export function useBookingsByUserIdQuery(userId: string | undefined) {
  return useQuery({
    queryKey: [queryKeys.GET_BOOKINGS_BY_USER_ID, userId],
    queryFn: () => bookingsServices.getBookingsByUserId(userId!),
    enabled: Boolean(userId),
    staleTime: BOOKINGS_STALE_TIME,
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.CREATE_BOOKING],
    mutationFn: bookingsServices.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_BOOKINGS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_BOOKINGS_BY_USER_ID] });
    },
    onError: error => {
      toast.error(`Failed to create booking: ${error.message ?? 'Unknown error'}`);
    },
  });
}

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.CANCEL_BOOKING],
    mutationFn: bookingsServices.cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_BOOKINGS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_BOOKINGS_BY_USER_ID] });
    },
    onError: error => {
      toast.error(`Failed to cancel booking: ${error.message ?? 'Unknown error'}`);
    },
  });
}
