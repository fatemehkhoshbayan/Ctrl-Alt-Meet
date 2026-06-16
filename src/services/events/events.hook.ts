import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import eventsServices from './events.services';
import queryKeys from '../enums';
import type { EventFilters, TTicketTier } from './events.type';

const EVENTS_STALE_TIME = 30_000;

export function useEventsQuery() {
  return useQuery({
    queryKey: [queryKeys.GET_EVENTS],
    queryFn: eventsServices.getEvents,
    staleTime: EVENTS_STALE_TIME,
  });
}

export function useFeaturedEventsQuery() {
  return useQuery({
    queryKey: [queryKeys.GET_FEATURED_EVENTS],
    queryFn: eventsServices.getFeaturedEvents,
    staleTime: EVENTS_STALE_TIME,
  });
}

export function useEventByIdQuery(id: string | undefined) {
  return useQuery({
    queryKey: [queryKeys.GET_EVENT_DETAILS, id],
    queryFn: () => eventsServices.getEventById(id!),
    enabled: Boolean(id),
    staleTime: EVENTS_STALE_TIME,
  });
}

export function usePaginatedEventsQuery(page: number, perPage: number, filters?: EventFilters) {
  return useQuery({
    queryKey: [queryKeys.GET_PAGINATED_EVENTS, page, perPage, filters],
    queryFn: () => eventsServices.getPaginated(page, perPage, filters),
    staleTime: EVENTS_STALE_TIME,
  });
}

export function usePurchaseTicketMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.PURCHASE_TICKET],
    mutationFn: ({ eventId, updatedTiers }: { eventId: string; updatedTiers: TTicketTier[] }) =>
      eventsServices.purchaseTicket(eventId, updatedTiers),
    onSuccess: (_data, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_EVENTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_FEATURED_EVENTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_EVENT_DETAILS, eventId] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_PAGINATED_EVENTS] });
    },
    onError: error => {
      toast.error(`Failed to update tickets: ${error.message ?? 'Unknown error'}`);
    },
  });
}
