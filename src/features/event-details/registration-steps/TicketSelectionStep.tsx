import type { TTicketTier } from '@/services';
import PassCard from '../PassCard';
import { Minus, Plus } from 'lucide-react';
import { IconButton } from '@/ui';

interface ITicketSelectionStep {
  selectedTier: TTicketTier | null;
  onSelectTier: (tier: TTicketTier) => void;
  quantity: number;
  onQuantityChange: (n: number) => void;
  maxQuantity: number;
  unitPrice: number;
  totalAmount: number;
}

export default function TicketSelectionStep({
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
    <div className="gap-gutter flex flex-col">
      <PassCard
        key={selectedTier.id}
        tier={selectedTier}
        isSelected={true}
        onSelect={onSelectTier}
      />

      {selectedTier && (
        <>
          <div className="bg-surface-container rounded-lg border border-white/10 p-6">
            <p className="text-label-md mb-3 font-medium text-white">Quantity</p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <IconButton
                  onClick={() => clampQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  className="border-outline-variant text-on-surface flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease quantity"
                  icon={<Minus size={18} />}
                />
                <span className="min-w-[2ch] text-center text-xl font-bold text-white">
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
              <span className="font-semibold text-white">Total</span>
              <span className="text-primary text-2xl font-bold">
                ${totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
