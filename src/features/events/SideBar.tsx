import { useEffect, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib';
import { Button, IconButton, Select } from '@/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories } from '@/store/categories';
import { setFilters, resetFilters, DEFAULT_FILTERS } from '@/store/events';
import { selectFilteredEvents } from '@/store/events';
import { DATE_RANGE_OPTIONS } from './constant';

const RANGE_THUMB_CLASS =
  'accent-primary pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary';

function isPriceFilterActive(priceMin: number, priceMax: number) {
  return priceMin > DEFAULT_FILTERS.priceMin || priceMax < DEFAULT_FILTERS.priceMax;
}

function formatPriceLabel(value: number) {
  return value >= DEFAULT_FILTERS.priceMax ? `${DEFAULT_FILTERS.priceMax}+` : String(value);
}

interface IPriceRangeSliderProps {
  priceMin: number;
  priceMax: number;
  onChange: (next: { priceMin?: number; priceMax?: number }) => void;
}

function PriceRangeSlider({ priceMin, priceMax, onChange }: IPriceRangeSliderProps) {
  const ceiling = DEFAULT_FILTERS.priceMax;

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

export default function SideBar({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const categories = useAppSelector(state => state.categories.items);
  const filters = useAppSelector(state => state.events.filters);
  const { totalItems } = useAppSelector(selectFilteredEvents);

  const activeFilterCount =
    (filters.searchQuery.trim() !== '' ? 1 : 0) +
    filters.categories.length +
    (filters.dateRange !== 'anytime' ? 1 : 0) +
    (isPriceFilterActive(filters.priceMin, filters.priceMax) ? 1 : 0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function toggleCategory(id: string) {
    const next = filters.categories.includes(id)
      ? filters.categories.filter(c => c !== id)
      : [...filters.categories, id];
    dispatch(setFilters({ categories: next }));
  }

  function handleReset() {
    dispatch(resetFilters());
  }

  const filterContent = (
    <div className="bg-surface-container-low rounded-lg p-6">
      <h3 className="font-headline-md text-headline-md mb-6 hidden lg:block">Filters</h3>
      <div className="space-y-8">
        <div>
          <p className="font-label-lg text-label-lg text-secondary mb-4 tracking-widest uppercase">
            Categories
          </p>
          <div className="space-y-3">
            {categories.map(category => (
              <label key={category.id} className="group flex cursor-pointer items-center gap-3">
                <input
                  checked={filters.categories.includes(category.name)}
                  className="border-outline-variant text-primary focus:ring-primary/20 h-5 w-5 rounded"
                  type="checkbox"
                  onChange={() => toggleCategory(category.name)}
                />
                <span className="font-body-md group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-label-lg text-label-lg text-secondary mb-4 tracking-widest uppercase">
            Date Range
          </p>
          <Select
            id="date-range"
            className="select select-option border-outline-variant text-body-lg hover:border-primary flex w-full items-center justify-between rounded-full border px-4 py-2 text-left transition-colors"
            options={DATE_RANGE_OPTIONS}
            value={filters.dateRange}
            onChangeOption={val => dispatch(setFilters({ dateRange: val }))}
          />
        </div>

        <div>
          <p className="font-label-lg text-label-lg text-secondary mb-4 tracking-widest uppercase">
            Price Range
          </p>
          <PriceRangeSlider
            priceMin={filters.priceMin}
            priceMax={filters.priceMax}
            onChange={next => dispatch(setFilters(next))}
          />
        </div>

        <Button size="sm" className="w-full" BtnText="Reset All" onClick={handleReset} />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger button */}
      <div className="relative w-fit lg:hidden">
        <Button
          variant="outlined"
          size="sm"
          BtnText="Filters"
          icon={<SlidersHorizontal size={16} />}
          onClick={() => setOpen(true)}
        />
        {activeFilterCount > 0 && (
          <span className="bg-primary text-on-primary text-label-sm absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full font-bold">
            {activeFilterCount}
          </span>
        )}
      </div>

      {/* Mobile full-screen drawer */}
      {open && (
        <div className="bg-background fixed inset-0 z-50 flex flex-col lg:hidden">
          <div className="border-outline-variant/30 flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={30} className="text-primary" />
              <span className="font-headline-md text-headline-md">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-on-primary flex items-center justify-center rounded-full text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <IconButton
              icon={<X size={30} />}
              onClick={() => setOpen(false)}
              aria-label="Close filters"
            />
          </div>

          <div className="text-body-xl flex-1 overflow-y-auto px-20 py-10 lg:px-0">
            {filterContent}
          </div>

          <div className="border-outline-variant/30 border-t p-4">
            <Button
              variant="filled"
              size="md"
              BtnText={`Show ${totalItems} result${totalItems !== 1 ? 's' : ''}`}
              className="w-full"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn('hidden lg:block', className)}>
        <div className="sticky top-32">{filterContent}</div>
      </aside>
    </>
  );
}
