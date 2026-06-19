import type { IEvent } from '../events/events.type';

export type TBookingAttendee = {
  name: string;
  email: string;
  phone: string;
};

export type TBookingStatus = 'confirmed' | 'cancelled' | 'pending';

export interface IBooking {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  ticketTierId: string;
  ticketTierName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: TBookingStatus;
  bookingReference: string;
  bookedAt: string;
  attendees: TBookingAttendee[];
}

export type TCreateBookingPayload = Omit<IBooking, 'id'>;

export interface IBookingSuccess {
  reference: string;
  eventTitle: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
}

export interface BookingsState {
  purchaseStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  bookingSuccess: IBookingSuccess | null;
}

export type PurchaseTicketPayload = {
  event: IEvent;
  tierId: string;
  quantity: number;
  attendees: TBookingAttendee[];
  userId: string;
};

export type MyBookingsLoaderData = {
  events: IEvent[];
  bookings: IBooking[];
};
