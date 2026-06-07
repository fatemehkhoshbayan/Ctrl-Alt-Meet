import { BadgeCheck } from 'lucide-react';
import { Card } from '@/ui';
import { getAvailabilityBadge } from '@/utils';
import type { TTicketTier } from '@/services';

export interface IPassCardProps {
  tier: TTicketTier;
  isSelected: boolean;
  onSelect: (tier: TTicketTier) => void;
}

export default function PassCard({ tier, isSelected, onSelect }: IPassCardProps) {
  const badge = getAvailabilityBadge(tier);
  const isSoldOut = tier.available === 0;
  const availabilityPercentage = Math.min(100, (tier.available / tier.total) * 100);

  return (
    <Card
      variant="outline"
      selected={isSelected}
      disabled={isSoldOut}
      onClick={() => onSelect(tier)}
    >
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 font-bold">
            {isSelected && <BadgeCheck size={16} className="text-primary shrink-0" />}
            {tier.name}
          </div>
          <p className="text-on-surface-variant text-label-sm mb-2">{tier.description}</p>
          <div className="flex flex-wrap gap-1">
            {tier.perks.map(perk => (
              <span
                key={perk}
                className="bg-surface-container text-on-surface-variant rounded-full px-2 py-0.5 text-xs"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-till text-2xl font-bold">${tier.price}</p>
          <span className={`rounded-full px-2 py-0.5 text-xs ${badge.className}`}>
            {badge.text}
          </span>
        </div>
      </div>

      {!isSoldOut && (
        <div className="mt-3 p-6">
          <div className="text-on-surface-variant mb-1 flex justify-between text-xs">
            {`${tier.available.toLocaleString()} left of ${tier.total.toLocaleString()}`}
          </div>
          <div className="bg-surface-container-high h-1 overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
