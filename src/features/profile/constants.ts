export const PREFERENCE_SUMMARY_ITEMS = [
  {
    key: 'emailNotifications' as const,
    label: 'Event email updates',
    description: 'News and changes for events you care about',
  },
  {
    key: 'eventReminders' as const,
    label: 'Booking reminders',
    description: 'Alerts before your upcoming bookings',
  },
] as const;

export const PREFERENCE_TOGGLE_ITEMS = [
  {
    id: 'emailNotifications' as const,
    title: 'Email me about event updates',
    description: 'Get notified when events you follow change or add new dates.',
  },
  {
    id: 'eventReminders' as const,
    title: 'Send reminders before my booked events',
    description: 'A friendly nudge so you never miss an event you booked.',
  },
] as const;
