import { CalendarDays, Star, Ticket, UsersRound, type LucideIcon } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Events', to: '/' },
  { label: 'Favorites', to: '/favorites' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'My Bookings', to: '/my-bookings' },
];

interface INavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
}

export const NAV_ITEMS: INavItem[] = [
  { label: 'Events', to: '/', icon: CalendarDays, end: true },
  { label: 'Favorites', to: '/favorites', icon: Star },
  { label: 'Bookings', to: '/my-bookings', icon: Ticket },
  { label: 'Speakers', to: '/speakers', icon: UsersRound },
];

/** Matches fixed mobile bottom nav height (icons + labels + padding). */
export const MOBILE_BOTTOM_NAV_SPACER = 'h-32 shrink-0';

export const FOOTER_LINKS = [
  // {
  //   label: 'Platform',
  //   links: [
  //     { id: 1, label: 'Discover', to: '/' },
  //     { id: 2, label: 'Host an Event', to: '/host-an-event' },
  //     { id: 3, label: 'Pricing', to: '/pricing' },
  //   ],
  // },
  {
    label: 'Community',
    links: [
      { id: 1, label: 'Code of Conduct', to: '/code-of-conduct' },
      { id: 2, label: 'Privacy', to: '/privacy' },
      { id: 3, label: 'Support', to: '/support' },
    ],
  },
];
