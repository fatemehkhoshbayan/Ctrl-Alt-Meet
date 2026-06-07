import { CalendarDays, Ticket, UsersRound, type LucideIcon } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Events', to: '/' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'My Bookings', to: '/my-booking' },
];

interface INavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
}

export const NAV_ITEMS: INavItem[] = [
  { label: 'Events', to: '/', icon: CalendarDays, end: true },
  { label: 'Bookings', to: '/my-booking', icon: Ticket },
  { label: 'Speakers', to: '/speakers', icon: UsersRound },
];

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
