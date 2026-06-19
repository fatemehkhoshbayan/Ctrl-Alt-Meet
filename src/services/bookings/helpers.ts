import { generateBookingReference } from '@/utils';
import type { PurchaseTicketPayload, TCreateBookingPayload } from './bookings.type';

export function buildCreateBookingPayload({
  event,
  tierId,
  quantity,
  attendees,
  userId,
}: PurchaseTicketPayload): TCreateBookingPayload {
  const tier = event.ticketTiers.find(tier => tier.id === tierId);
  if (!tier) {
    throw new Error('Ticket tier not found');
  }

  const bookingReference = generateBookingReference();

  return {
    userId,
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    eventLocation: `${event.venue}, ${event.city}, ${event.country}`,
    ticketTierId: tier.id,
    ticketTierName: tier.name,
    quantity,
    unitPrice: tier.price,
    totalPrice: tier.price * quantity,
    status: 'confirmed',
    bookingReference,
    bookedAt: new Date().toISOString(),
    attendees,
  };
}
