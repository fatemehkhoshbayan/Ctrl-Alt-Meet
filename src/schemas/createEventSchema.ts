import { z } from 'zod';

const ticketTierFormSchema = z.object({
  name: z.string().min(1, 'Tier name is required.'),
  price: z.number().min(0, 'Price must be 0 or greater.'),
  description: z.string().min(1, 'Tier description is required.'),
  perks: z.string().min(1, 'Add at least one perk (comma-separated).'),
  total: z.number().min(1, 'Total capacity must be at least 1.'),
});

const highlightFormSchema = z.object({
  title: z.string().min(1, 'Highlight title is required.'),
  description: z.string().min(1, 'Highlight description is required.'),
  icon: z.string().min(1, 'Select an icon.'),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  accent: z.enum(['primary', 'secondary', 'default']).optional(),
});

export const createEventSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters.'),
    shortDescription: z
      .string()
      .min(10, 'Short description must be at least 10 characters.')
      .max(200, 'Short description must be 200 characters or fewer.'),
    description: z.string().min(20, 'Description must be at least 20 characters.'),
    category: z.string().min(1, 'Select a category.'),
    tags: z.string().min(1, 'Add at least one tag (comma-separated).'),
    date: z.string().min(1, 'Start date is required.'),
    endDate: z.string().min(1, 'End date is required.'),
    time: z.string().min(1, 'Start time is required.'),
    endTime: z.string().min(1, 'End time is required.'),
    timezone: z.string().min(1, 'Timezone is required.'),
    venue: z.string().min(1, 'Venue is required.'),
    city: z.string().min(1, 'City is required.'),
    country: z.string().min(1, 'Country is required.'),
    maxAttendees: z.number().min(1, 'Capacity must be at least 1.'),
    imageUrl: z.string().optional(),
    venueImage: z.string().optional(),
    ticketTiers: z.array(ticketTierFormSchema).min(1, 'Add at least one ticket tier.'),
    speakers: z.array(z.string()),
    highlights: z.array(highlightFormSchema),
  })
  .refine(data => data.endDate >= data.date, {
    message: 'End date must be on or after the start date.',
    path: ['endDate'],
  });

export type TCreateEventFormValues = z.infer<typeof createEventSchema>;

export const CREATE_EVENT_STEP_FIELDS = {
  1: ['title', 'shortDescription', 'description', 'category', 'tags'] as const,
  2: ['date', 'endDate', 'time', 'endTime', 'timezone', 'venue', 'city', 'country'] as const,
  3: ['maxAttendees', 'imageUrl', 'venueImage', 'ticketTiers'] as const,
  4: ['speakers', 'highlights'] as const,
} satisfies Record<number, readonly (keyof TCreateEventFormValues)[]>;
