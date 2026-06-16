const BASE_EVENTS_URL = '/events';

const eventsEndpoint = {
  events: BASE_EVENTS_URL,
  featuredEvents: `${BASE_EVENTS_URL}?isFeatured=true`,
  eventById: (eventId: string) => `${BASE_EVENTS_URL}/${eventId}`,
  paginatedEvents: (params: URLSearchParams) => `${BASE_EVENTS_URL}?${params.toString()}`,
  purchaseTicket: (eventId: string) => `${BASE_EVENTS_URL}/${eventId}`,
};

export default eventsEndpoint;
