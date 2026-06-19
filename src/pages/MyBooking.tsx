import { MyBookingCards, HeroSection, InspirationSection } from '@/features';
import { LoadingState, ErrorState } from '@/shared';
import { useAuth } from '@/hooks';
import { useBookingsByUserId, useEvents } from '@/services';
import { Tab } from '@/ui';

export default function MyBooking() {
  const { user } = useAuth();

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError: bookingsIsError,
    error: bookingsError,
  } = useBookingsByUserId(user?.id);

  const {
    data: events = [],
    isLoading: eventsLoading,
    isError: eventsIsError,
    error: eventsError,
  } = useEvents();

  const today = new Date();
  const upcomingBookings = bookings.filter(
    booking => booking.status !== 'cancelled' && new Date(booking.eventDate) >= today,
  );
  const pastBookings = bookings.filter(booking => new Date(booking.eventDate) < today);

  const isLoading = bookingsLoading || eventsLoading;
  const error = bookingsIsError
    ? (bookingsError?.message ?? 'Failed to load bookings')
    : eventsIsError
      ? (eventsError?.message ?? 'Failed to load events')
      : null;

  return (
    <>
      <HeroSection />

      {isLoading && <LoadingState message="Loading bookings..." />}
      {error && <ErrorState error={error} />}

      {!isLoading && !error && (
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
      )}

      <InspirationSection />
    </>
  );
}
