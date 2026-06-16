import { DEFAULT_EVENT_FILTERS } from '@/services';

const RANGE_THUMB_CLASS =
  'accent-primary pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary';

function formatPriceLabel(value: number) {
  return value >= DEFAULT_EVENT_FILTERS.priceMax
    ? `${DEFAULT_EVENT_FILTERS.priceMax}+`
    : String(value);
}

interface IPriceRangeSliderProps {
  priceMin: number;
  priceMax: number;
  onChange: (next: { priceMin?: number; priceMax?: number }) => void;
}

function PriceRangeSlider({ priceMin, priceMax, onChange }: IPriceRangeSliderProps) {
  const ceiling = DEFAULT_EVENT_FILTERS.priceMax;

  return (
    <div>
      <div className="relative h-6">
        <div className="bg-outline-variant absolute top-1/2 right-0 left-0 h-2 -translate-y-1/2 rounded-full" />
        <input
          aria-label="Minimum price"
          className={RANGE_THUMB_CLASS}
          type="range"
          min={0}
          max={ceiling}
          value={priceMin}
          onChange={e => {
            const next = Math.min(Number(e.target.value), priceMax);
            onChange({ priceMin: next });
          }}
        />
        <input
          aria-label="Maximum price"
          className={RANGE_THUMB_CLASS}
          type="range"
          min={0}
          max={ceiling}
          value={priceMax}
          onChange={e => {
            const next = Math.max(Number(e.target.value), priceMin);
            onChange({ priceMax: next });
          }}
        />
      </div>
      <div className="font-body-lg text-body-lg text-on-surface-variant mt-2 flex justify-between">
        <span>${formatPriceLabel(priceMin)}</span>
        <span>
          ${priceMin} – ${formatPriceLabel(priceMax)}
        </span>
        <span>${formatPriceLabel(ceiling)}</span>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
