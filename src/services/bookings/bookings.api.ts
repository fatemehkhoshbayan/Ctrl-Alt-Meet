import { clients } from '../clients';
import type { IBooking } from './bookings.type';

export const bookingsApi = {
  getAll: () => clients<IBooking[]>('/bookings', { method: 'GET' }),
};
