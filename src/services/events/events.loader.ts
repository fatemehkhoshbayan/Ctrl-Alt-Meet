import type { LoaderFunctionArgs } from 'react-router-dom';
import { queryClient } from '@/lib';
import { speakersByEventIdsQueryOptions } from '../speakers/speakers.queries';
import { eventByIdQueryOptions, eventsQueryOptions } from './events.queries';
import type {
  BookingLoaderData,
  EventDetailsLoaderData,
  EventsLoaderData,
} from './events.type';

export async function eventsLoader(): Promise<EventsLoaderData> {
  const events = await queryClient.ensureQueryData(eventsQueryOptions());
  return { events };
}

export async function eventDetailsLoader({
  params,
}: LoaderFunctionArgs): Promise<EventDetailsLoaderData> {
  const id = params.id!;
  const event = await queryClient.ensureQueryData(eventByIdQueryOptions(id));

  if (!event) {
    throw new Response('Event not found', { status: 404 });
  }

  const speakers = queryClient.ensureQueryData(speakersByEventIdsQueryOptions(event.speakers));

  return { event, speakers };
}

export async function bookingLoader({
  params,
}: LoaderFunctionArgs): Promise<BookingLoaderData> {
  const event = await queryClient.ensureQueryData(eventByIdQueryOptions(params.eventId!));
  return { event };
}
