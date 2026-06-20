import type { IUser } from '../users/users.type';
import type { IEvent, TTicketTier } from './events.type';
import type { TCreateEventFormValues } from '@/schemas';

const DEFAULT_EVENT_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';
const DEFAULT_VENUE_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80';

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseCommaSeparated(value: string) {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

function buildTicketTiers(tiers: TCreateEventFormValues['ticketTiers']): TTicketTier[] {
  return tiers.map((tier, index) => ({
    id: `tier-new-${index + 1}`,
    name: tier.name,
    price: tier.price,
    description: tier.description,
    perks: parseCommaSeparated(tier.perks),
    available: tier.total,
    total: tier.total,
  }));
}

function buildHighlights(highlights: TCreateEventFormValues['highlights']) {
  return highlights.map((highlight, index) => ({
    id: `hl-new-${index + 1}`,
    title: highlight.title.trim(),
    description: highlight.description.trim(),
    icon: highlight.icon,
    ...(highlight.image?.trim() ? { image: highlight.image.trim() } : {}),
    ...(highlight.featured ? { featured: true } : {}),
    ...(highlight.accent && highlight.accent !== 'default' ? { accent: highlight.accent } : {}),
  }));
}

export function buildCreateEventPayload(
  values: TCreateEventFormValues,
  user: IUser,
): IEvent {
  const location = `${values.venue}, ${values.city}, ${values.country}`;

  return {
    id: `evt-${Date.now()}`,
    title: values.title.trim(),
    slug: slugify(values.title),
    description: values.description.trim(),
    shortDescription: values.shortDescription.trim(),
    date: values.date,
    endDate: values.endDate,
    time: values.time,
    endTime: values.endTime,
    timezone: values.timezone,
    location,
    venue: values.venue.trim(),
    city: values.city.trim(),
    country: values.country.trim(),
    category: values.category,
    tags: parseCommaSeparated(values.tags),
    imageUrl: values.imageUrl?.trim() || DEFAULT_EVENT_IMAGE,
    venueImage: values.venueImage?.trim() || DEFAULT_VENUE_IMAGE,
    organizer: {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      website: '',
    },
    highlights: buildHighlights(values.highlights),
    speakers: values.speakers,
    isFeatured: false,
    isFavorite: false,
    attendeeCount: 0,
    maxAttendees: values.maxAttendees,
    ticketTiers: buildTicketTiers(values.ticketTiers),
    schedule: [],
  };
}
