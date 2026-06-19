import { useQuery } from '@tanstack/react-query';
import {
  speakerByIdQueryOptions,
  speakersByEventIdsQueryOptions,
  speakersQueryOptions,
} from './speakers.queries';

export function useSpeakers() {
  return useQuery(speakersQueryOptions());
}

export function useSpeakersByEventIds(ids: string[] | undefined) {
  return useQuery({
    ...speakersByEventIdsQueryOptions(ids ?? []),
    enabled: Boolean(ids?.length),
  });
}

export function useSpeakerById(speakerId: string) {
  return useQuery(speakerByIdQueryOptions(speakerId));
}
