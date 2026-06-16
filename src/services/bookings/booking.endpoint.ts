const BASE_BOOKINGS_URL = '/bookings';

const bookingsEndpoint = {
  bookings: BASE_BOOKINGS_URL,
  bookingById: (id: string) => `${BASE_BOOKINGS_URL}/${id}`,
  bookingsByUserId: (userId: string) =>
    `${BASE_BOOKINGS_URL}?userId=${encodeURIComponent(userId)}`,
};

export default bookingsEndpoint;
