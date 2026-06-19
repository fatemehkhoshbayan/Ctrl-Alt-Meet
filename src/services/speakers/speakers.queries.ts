import { queryOptions } from '@tanstack/react-query';
import queryKeys from '../enums';
import { getSpeakersByIds } from './helpers';
import speakersServices from './speakers.services';

const SPEAKERS_STALE_TIME = 60_000;

export const speakersQueryOptions = () =>
  queryOptions({
    queryKey: [queryKeys.GET_SPEAKERS],
    queryFn: () => speakersServices.getSpeakers(),
    staleTime: SPEAKERS_STALE_TIME,
  });

export const speakersByEventIdsQueryOptions = (speakerIds: string[]) =>
  queryOptions({
    queryKey: [queryKeys.GET_SPEAKERS, 'byEventIds', speakerIds],
    queryFn: () =>
      speakersServices.getSpeakers().then(all => getSpeakersByIds(all, speakerIds)),
    staleTime: SPEAKERS_STALE_TIME,
  });

export const speakerByIdQueryOptions = (speakerId: string) =>
  queryOptions({
    queryKey: [queryKeys.GET_SPEAKER_BY_ID, speakerId],
    queryFn: () => speakersServices.getSpeakerById(speakerId),
    staleTime: SPEAKERS_STALE_TIME,
  });
