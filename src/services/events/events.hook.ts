import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import eventsServices from './events.services';
import queryKeys from '../enums';
import type { TTicketTier } from './events.type';
import { eventByIdQueryOptions, eventsQueryOptions } from './events.queries';

const EVENTS_STALE_TIME = 30_000;

export function useEvents() {
  return useQuery(eventsQueryOptions());
}

export function useFeaturedEvents() {
  return useQuery({
    queryKey: [queryKeys.GET_FEATURED_EVENTS],
    queryFn: eventsServices.getFeaturedEvents,
    staleTime: EVENTS_STALE_TIME,
  });
}

export function useEventById(id: string | undefined) {
  return useQuery({
    ...eventByIdQueryOptions(id!),
    enabled: Boolean(id),
  });
}

export function usePurchaseTicket() {
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
