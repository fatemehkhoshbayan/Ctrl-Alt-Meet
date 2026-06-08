import { useEffect } from 'react';

import { RequireAuth, MyBookingCards, HeroSection, InspirationSection } from '@/features';
import { LoadingState, ErrorState } from '@/shared';
import { useAuth } from '@/hooks';
import { fetchBookings } from '@/store/bookings';
import { fetchEvents } from '@/store/events';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Tab } from '@/ui';

function MyBookingContent() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const {
    items: bookings,
    status: bookingStatus,
    error: bookingError,
  } = useAppSelector(state => state.bookings);

  const {
    allItems: events,
    status: eventStatus,
    error: eventError,
  } = useAppSelector(state => state.events);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookings(user.id));
      dispatch(fetchEvents());
    }
  }, [dispatch, user]);

  const today = new Date();
  const upcomingBookings = bookings.filter(booking => new Date(booking.eventDate) >= today);
  const pastBookings = bookings.filter(booking => new Date(booking.eventDate) < today);

  const isLoading = bookingStatus === 'loading' || eventStatus === 'loading';
  const error = bookingError || eventError;

  return (
    <>
      <HeroSection />

      {isLoading && <LoadingState message="Loading bookings..." />}
      {error && <ErrorState error={error} />}

      {bookingStatus === 'succeeded' && eventStatus === 'succeeded' && (
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

export default function MyBooking() {
  return (
    <RequireAuth>
      <MyBookingContent />
    </RequireAuth>
  );
}
