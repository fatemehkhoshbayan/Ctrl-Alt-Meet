import { z } from 'zod';

export const authSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(4, 'Password must be at least 4 characters.'),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
});

export type TAuthFormValues = z.infer<typeof authSchema>;
