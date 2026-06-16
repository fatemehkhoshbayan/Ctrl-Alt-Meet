import { clients } from '../clients';
import bookingsEndpoint from './booking.endpoint';
import type { IBooking, TCreateBookingPayload } from './bookings.type';

const bookingsServices = {
  getBookings: () => clients<IBooking[]>(bookingsEndpoint.bookings, { method: 'GET' }),
  getBookingsByUserId: (userId: string) =>
    clients<IBooking[]>(bookingsEndpoint.bookingsByUserId(userId), { method: 'GET' }),
  createBooking: (payload: TCreateBookingPayload) =>
    clients<IBooking>(bookingsEndpoint.bookings, { method: 'POST', body: JSON.stringify(payload) }),
  cancelBooking: (id: string) =>
    clients<IBooking>(bookingsEndpoint.bookingById(id), {
      method: 'PATCH',
      body: JSON.stringify({ status: 'cancelled' }),
    }),
};

export default bookingsServices;
