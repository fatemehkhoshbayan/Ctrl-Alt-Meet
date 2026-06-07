import { z } from 'zod';

const attendeeSchema = z.object({
  name: z.string().min(5, 'Full name must be at least 5 characters.'),
  email: z.email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number.')
    .regex(/^[+\d\s()-]+$/, 'Phone may only contain digits, spaces, and + ( ) -'),
});

export const getPassSchema = z.object({
  attendees: z.array(attendeeSchema).min(1),
});

export type TGetPassSchema = z.infer<typeof getPassSchema>;
