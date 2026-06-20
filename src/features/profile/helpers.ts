import type { TCategory, IUserPreferences } from '@/services';
import type { TProfilePreferencesValues } from '@/schemas';

export function buildPreferenceFormValues(
  preferences: IUserPreferences = {},
): TProfilePreferencesValues['preferences'] {
  return {
    emailNotifications: preferences.emailNotifications ?? false,
    eventReminders: preferences.eventReminders ?? false,
    preferredCategory: preferences.preferredCategory ?? '',
  };
}

export function getCategoryLabel(
  categoryId: string | undefined,
  categories: Pick<TCategory, 'id' | 'name'>[],
) {
  if (!categoryId) return 'No preference';
  return categories.find(category => category.id === categoryId)?.name ?? categoryId;
}
