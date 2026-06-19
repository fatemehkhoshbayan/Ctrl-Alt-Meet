const queryKeys = {
  // bookings
  GET_BOOKINGS: 'getBookings',
  GET_BOOKINGS_BY_USER_ID: 'getBookingsByUserId',
  CREATE_BOOKING: 'createBooking',
  CANCEL_BOOKING: 'cancelBooking',

  // events
  GET_EVENTS: 'getEvents',
  GET_FEATURED_EVENTS: 'getFeaturedEvents',
  GET_EVENT_DETAILS: 'getEventDetails',
  PURCHASE_TICKET: 'purchaseTicket',
  GET_PAGINATED_EVENTS: 'getPaginatedEvents',

  // categories
  GET_CATEGORIES: 'getCategories',

  // speakers
  GET_SPEAKERS: 'getSpeakers',

  // favorites
  GET_FAVORITES_BY_USER_ID: 'getFavoritesByUserId',
  ADD_FAVORITE: 'addFavorite',
  REMOVE_FAVORITE: 'removeFavorite',

  // users
  USERS: 'users',
};

export default queryKeys;
