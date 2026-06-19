import { queryOptions } from '@tanstack/react-query';
import eventsServices from './events.services';
import queryKeys from '../enums';

const EVENTS_STALE_TIME = 30_000;

export const eventsQueryOptions = () =>
  queryOptions({
    queryKey: [queryKeys.GET_EVENTS],
    queryFn: () => eventsServices.getEvents(),
    staleTime: EVENTS_STALE_TIME,
  });

export const eventByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [queryKeys.GET_EVENT_DETAILS, id],
    queryFn: () => eventsServices.getEventById(id),
    staleTime: EVENTS_STALE_TIME,
  });
