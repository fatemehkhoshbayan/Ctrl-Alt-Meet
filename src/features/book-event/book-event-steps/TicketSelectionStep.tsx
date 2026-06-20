import { Minus, Plus } from 'lucide-react';

import { PassCard } from '@/shared';
import { IconButton } from '@/ui';
import type { ITicketSelectionStep } from '@/features';

export default function TicketSelectionStep({
  tiers,
  selectedTier,
  onSelectTier,
  quantity,
  onQuantityChange,
  maxQuantity,
  unitPrice,
  totalAmount,
}: ITicketSelectionStep) {
  const clampQuantity = (next: number) => {
    onQuantityChange(Math.min(maxQuantity, Math.max(1, next)));
  };

  return (
    <section className="gap-gutter flex flex-col">
      {tiers.length > 0 ? (
        <div
          className="py-gutter gap-stack-gap flex flex-col"
          role="group"
          aria-label="Ticket tiers"
        >
          {tiers.map(tier => (
            <PassCard
              key={tier.id}
              tier={tier}
              isSelected={selectedTier?.id === tier.id}
              onSelect={onSelectTier}
            />
          ))}
        </div>
      ) : (
        <p className="bg-surface-container text-on-surface-variant rounded-lg p-4 text-sm">
          No passes are available for this event yet.
        </p>
      )}

      {selectedTier && (
        <>
          <div className="bg-surface-container rounded-lg border border-white/10 p-6">
            <p className="text-on-surface-variant text-label-md mb-3 font-medium">Quantity</p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <IconButton
                  onClick={() => clampQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  className="border-outline-variant text-on-surface flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease quantity"
                  icon={<Minus size={18} />}
                />
                <span className="text-on-surface min-w-5 text-center text-xl font-bold">
                  {quantity}
                </span>
                <IconButton
                  onClick={() => clampQuantity(quantity + 1)}
                  disabled={quantity >= maxQuantity}
                  className="border-outline-variant text-on-surface flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase quantity"
                  icon={<Plus size={18} />}
                />
              </div>
              <p className="text-on-surface-variant text-label-sm">{maxQuantity} available</p>
            </div>
          </div>

          <div className="bg-surface-container-high rounded-lg p-6">
            <div className="text-on-surface-variant mb-2 flex justify-between text-sm">
              <span>
                {quantity} × {selectedTier.name} @ ${unitPrice}
              </span>
              <span>${(unitPrice * quantity).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-on-surface-variant font-semibold">Total</span>
              <span className="text-primary text-2xl font-bold">
                ${totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
