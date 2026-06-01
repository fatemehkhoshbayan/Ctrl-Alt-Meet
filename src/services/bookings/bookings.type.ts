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
}


export type TCreateBookingPayload = Omit<IBooking, 'id'>;
