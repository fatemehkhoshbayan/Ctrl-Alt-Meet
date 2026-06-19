import { useLoaderData } from 'react-router-dom';
import { MyBookingCards, HeroSection, InspirationSection } from '@/features';
import { useAuth } from '@/hooks';
import type { MyBookingsLoaderData } from '@/services';
import { Tab } from '@/ui';

export default function MyBooking() {
  const { user } = useAuth();
  const { bookings, events } = useLoaderData() as MyBookingsLoaderData;

  const today = new Date();
  const upcomingBookings = bookings.filter(
    booking => booking.status !== 'cancelled' && new Date(booking.eventDate) >= today,
  );
  const pastBookings = bookings.filter(booking => new Date(booking.eventDate) < today);

  if (!user) return null;

  return (
    <>
      <HeroSection />

      <Tab
        tabs={[
          {
            id: 'upcoming',
            label: 'Upcoming',
            content: (
              <MyBookingCards bookings={upcomingBookings} events={events} status="upcoming" />
            ),
          },
          {
            id: 'past',
            label: 'Past Events',
            content: <MyBookingCards bookings={pastBookings} events={events} status="past" />,
          },
        ]}
      />

      <InspirationSection />
    </>
  );
}
