import { z } from 'zod';

const optionalUrl = z
  .string()
  .url('Please enter a valid image URL.')
  .optional()
  .or(z.literal(''));

const optionalAbout = z
  .string()
  .max(500, 'About me must be 500 characters or fewer.')
  .optional()
  .or(z.literal(''));

const preferencesShape = z.object({
  emailNotifications: z.boolean(),
  eventReminders: z.boolean(),
  preferredCategory: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  about: optionalAbout,
  imageUrl: optionalUrl,
  preferences: preferencesShape,
});

export const profileNameSchema = profileSchema.pick({ name: true });
export const profileImageSchema = profileSchema.pick({ imageUrl: true });
export const profileAboutSchema = profileSchema.pick({ about: true });
export const profilePreferencesSchema = profileSchema.pick({ preferences: true });

export type TProfileFormValues = z.infer<typeof profileSchema>;
export type TProfileNameValues = z.infer<typeof profileNameSchema>;
export type TProfileImageValues = z.infer<typeof profileImageSchema>;
export type TProfileAboutValues = z.infer<typeof profileAboutSchema>;
export type TProfilePreferencesValues = z.infer<typeof profilePreferencesSchema>;
