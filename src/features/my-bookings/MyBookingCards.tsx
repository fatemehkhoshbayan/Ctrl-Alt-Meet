import { Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { EmptyState } from '@/shared';
import type { IBooking, IEvent } from '@/services';
import { Button } from '@/ui';
import MyBookingCard, { type TBookingCardStatus } from './MyBookingCard';

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
  const navigate = useNavigate();

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
      >
        <Button BtnText="Browse Events" onClick={() => navigate('/')} />
      </EmptyState>
    );
  }

  return (
    <section className="gap-gutter mx-auto grid min-h-[35vh] w-full max-w-7xl grid-cols-1 lg:min-w-7xl xl:grid-cols-3">
      {bookingsWithEvents.map(({ booking, event }) => (
        <MyBookingCard key={booking.id} booking={booking} event={event} status={status} />
      ))}
    </section>
  );
}
