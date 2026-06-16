import { clients } from '../clients';
import speakersEndpoint from './speakers.endpoint';
import type { ISpeaker } from './speakers.type';

const speakersServices = {
  getSpeakers: () => clients<ISpeaker[]>(speakersEndpoint.speakers, { method: 'GET' }),
};

export default speakersServices;
