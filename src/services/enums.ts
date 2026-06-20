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
  CREATE_EVENT: 'createEvent',
  GET_PAGINATED_EVENTS: 'getPaginatedEvents',

  // categories
  GET_CATEGORIES: 'getCategories',

  // speakers
  GET_SPEAKERS: 'getSpeakers',
  GET_SPEAKER_BY_ID: 'getSpeakerById',

  // favorites
  GET_FAVORITES_BY_USER_ID: 'getFavoritesByUserId',
  ADD_FAVORITE: 'addFavorite',
  REMOVE_FAVORITE: 'removeFavorite',

  // users
  USERS: 'users',
  GET_USER_BY_ID: 'getUserById',
  UPDATE_USER: 'updateUser',
};

export default queryKeys;
