export interface EventFilters {
  categories: string[];
  dateRange: string;
  priceMin: number;
  priceMax: number;
  sortBy: string;
  searchQuery: string;
}

export type TTicketTier = {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  available: number;
  total: number;
};

export type TOrganizer = {
  name: string;
  avatar: string;
  email: string;
  website: string;
};

export type TSchedule = {
  time: string;
  title: string;
  speaker?: string;
  type: 'keynote' | 'workshop' | 'panel' | 'break' | 'talk' | 'lightning' | 'social';
};

export type TEventHighlight = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  featured?: boolean;
  accent?: 'primary' | 'secondary' | 'default';
};

export interface IPaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export interface IEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  timezone: string;
  location: string;
  venue: string;
  city: string;
  country: string;
  category: string;
  tags: string[];
  imageUrl: string;
  venueImage: string;
  organizer: TOrganizer;
  highlights: TEventHighlight[];
  speakers: string[];
  isFeatured: boolean;
  isFavorite: boolean;
  attendeeCount: number;
  maxAttendees: number;
  ticketTiers: TTicketTier[];
  schedule: TSchedule[];
}

export interface EventsState {
  currentPage: number;
  filters: EventFilters;
}

export type TPurchaseTicketPayload = {
  event: IEvent;
  tierId: string;
  quantity: number;
  attendees: import('../bookings/bookings.type').TBookingAttendee[];
  userId: string;
};

export type TPurchaseTicketResult = {
  event: IEvent;
  booking: import('../bookings/bookings.type').IBooking;
  bookingReference: string;
};
