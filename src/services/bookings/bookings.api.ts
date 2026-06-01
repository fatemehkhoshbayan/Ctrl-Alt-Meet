import { clients } from '../clients';
import type { IBooking, TCreateBookingPayload } from './bookings.type';

export const bookingsApi = {
  getAll: () => clients<IBooking[]>('/bookings', { method: 'GET' }),
  create: (payload: TCreateBookingPayload) =>
    clients<IBooking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
