import type { TTicketTier } from '@/services';

export default function getAvailabilityBadge(tier: TTicketTier): {
  text: string;
  className: string;
} {
  if (tier.available === 0) return { text: 'Sold Out', className: 'bg-error/20 text-red-400' };

  const pct = tier.available / tier.total;

  if (pct < 0.1) return { text: 'Almost Gone', className: 'bg-red-500/20 text-red-400' };
  if (pct < 0.3) return { text: 'Limited', className: 'bg-secondary/20 text-secondary' };

  return { text: 'Available', className: 'bg-primary/20 text-primary' };
}
