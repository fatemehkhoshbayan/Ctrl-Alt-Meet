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
      <div className="gap-stack-gap flex items-start justify-between p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="font-headline-md text-headline-md mb-1 flex items-center gap-2 font-bold">
            {isSelected && <BadgeCheck size={20} className="text-primary shrink-0" />}
            {tier.name}
          </div>
          <p className="text-on-surface-variant text-body-lg mb-2">{tier.description}</p>
          <div className="flex flex-wrap gap-4">
            {tier.perks.map(perk => (
              <p
                key={perk}
                className="bg-surface-container text-till text-label-md w-fit rounded-full border px-2 py-0.5"
              >
                {perk}
              </p>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 text-center">
          <p className="text-till text-2xl font-bold">${tier.price}</p>
          <span className={`text-label-md rounded-full px-3 py-1 ${badge.className}`}>
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
