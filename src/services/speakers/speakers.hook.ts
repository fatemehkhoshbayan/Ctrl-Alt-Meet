import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSpeakersByIds } from './helpers';
import speakersServices from './speakers.services';
import queryKeys from '../enums';

const SPEAKERS_STALE_TIME = 60_000;

export function useSpeakersQuery() {
  return useQuery({
    queryKey: [queryKeys.GET_SPEAKERS],
    queryFn: speakersServices.getSpeakers,
    staleTime: SPEAKERS_STALE_TIME,
  });
}

export function useSpeakersByIdsQuery(ids: string[] | undefined) {
  const { data: speakers = [], ...query } = useSpeakersQuery();

  const filteredSpeakers = useMemo(() => getSpeakersByIds(speakers, ids), [speakers, ids]);

  return { data: filteredSpeakers, ...query };
}
