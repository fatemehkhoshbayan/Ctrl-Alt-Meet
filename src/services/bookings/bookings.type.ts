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
