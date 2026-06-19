import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSpeakersByIds } from './helpers';
import speakersServices from './speakers.services';
import queryKeys from '../enums';

const SPEAKERS_STALE_TIME = 60_000;

export function useSpeakers() {
  return useQuery({
    queryKey: [queryKeys.GET_SPEAKERS],
    queryFn: speakersServices.getSpeakers,
    staleTime: SPEAKERS_STALE_TIME,
  });
}

export function useSpeakersByEventIds(ids: string[] | undefined) {
  const { data: speakers = [], ...query } = useSpeakers();

  const filteredSpeakers = useMemo(() => getSpeakersByIds(speakers, ids), [speakers, ids]);

  return { data: filteredSpeakers, ...query };
}

export function useSpeakerById(speakerId: string) {
  return useQuery({
    queryKey: [queryKeys.GET_SPEAKER_BY_ID, speakerId],
    queryFn: () => speakersServices.getSpeakerById(speakerId),
    staleTime: SPEAKERS_STALE_TIME,
  });
}
