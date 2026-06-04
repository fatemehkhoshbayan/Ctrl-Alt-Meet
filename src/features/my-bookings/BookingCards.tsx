import { Inbox } from 'lucide-react';

import { EmptyState } from '@/shared';
import type { IBooking, IEvent } from '@/services';
import BookingCard, { type TBookingCardStatus } from './BookingCard';

export default function BookingCards({
  bookings,
  events,
  status = 'upcoming',
}: {
  bookings: IBooking[];
  events: IEvent[];
  status?: TBookingCardStatus;
}) {
  const eventsById = new Map(events.map(event => [event.id, event]));

  const bookingsWithEvents = bookings.flatMap(booking => {
    const event = eventsById.get(booking.eventId);
    return event ? [{ booking, event }] : [];
  });

  if (bookingsWithEvents.length === 0) {
    return (
      <EmptyState
        title="No bookings found"
        message="You haven't booked any events yet."
        icon={<Inbox size={48} className="text-primary" />}
      />
    );
  }

  return (
    <div className="gap-gutter mx-auto grid w-full max-w-7xl min-w-7xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {bookingsWithEvents.map(({ booking, event }) => (
        <BookingCard key={booking.id} booking={booking} event={event} status={status} />
      ))}
    </div>
  );
}
