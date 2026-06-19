import type { ISpeaker } from './speakers.type';

export function getSpeakersByIds(speakers: ISpeaker[], ids: string[] | undefined) {
  if (!ids?.length) return [];
  return speakers.filter(speaker => ids.includes(speaker.id));
}
