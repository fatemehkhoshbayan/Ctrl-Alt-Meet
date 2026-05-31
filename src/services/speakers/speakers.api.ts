import { clients } from '../clients';
import type { ISpeaker } from './speakers.type';

export const speakersApi = {
  getAll: () => clients<ISpeaker[]>('/speakers', { method: 'GET' }),
};
