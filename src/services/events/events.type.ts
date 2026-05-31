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
  category: string;
  tags: string[];
  imageUrl: string;
  organizer: TOrganizer;
  speakers: string[];
  isFeatured: boolean;
  isFavorite: boolean;
  attendeeCount: number;
  maxAttendees: number;
  ticketTiers: TTicketTier[];
  schedule: TSchedule[];
}
