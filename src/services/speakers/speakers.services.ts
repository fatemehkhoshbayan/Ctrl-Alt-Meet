import { clients } from '../clients';
import speakersEndpoint from './speakers.endpoint';
import type { ISpeaker } from './speakers.type';

const speakersServices = {
  getSpeakers: () => clients<ISpeaker[]>(speakersEndpoint.speakers, { method: 'GET' }),
  getSpeakerById: (speakerId: string) =>
    clients<ISpeaker>(speakersEndpoint.speakerById(speakerId), { method: 'GET' }),
};

export default speakersServices;
