import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button, IconButton, Select } from '@/ui';
import { useCategories, DEFAULT_EVENT_FILTERS, type IEvent } from '@/services';
import { CreateEventHelper } from '@/shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getFilteredEvents, setFilters, resetFilters } from '@/store/events';
import { DATE_RANGE_OPTIONS } from './constant';
import PriceRangeSlider from './PriceRangeSlider';

function isPriceFilterActive(priceMin: number, priceMax: number) {
  return priceMin > DEFAULT_EVENT_FILTERS.priceMin || priceMax < DEFAULT_EVENT_FILTERS.priceMax;
}

interface ISideBarProps {
  events: IEvent[];
}

export default function SideBar({ events }: ISideBarProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { data: categories = [] } = useCategories();
  const filters = useAppSelector(state => state.events.filters);
  const currentPage = useAppSelector(state => state.events.currentPage);

  const { totalItems } = useMemo(
    () => getFilteredEvents(events, filters, currentPage),
    [events, filters, currentPage],
  );

  const activeFilterCount =
    (filters.searchQuery.trim() !== '' ? 1 : 0) +
    filters.categories.length +
    (filters.dateRange !== 'anytime' ? 1 : 0) +
    (isPriceFilterActive(filters.priceMin, filters.priceMax) ? 1 : 0);

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
    <>
      <section className="bg-surface-container-low rounded-lg p-6">
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
      </section>
      <CreateEventHelper
        className="shadow-primary/25 bg-surface-container-low flex w-full flex-col gap-4 rounded-lg p-6 shadow-md"
        description=" Want to bring the local dev community together? We can help."
      />
    </>
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

          <div className="text-body-xl px-page-inline flex-1 overflow-y-auto py-10">
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
      <aside className="hidden min-w-0 lg:block">
        <div className="sticky top-32 flex flex-col gap-6">{filterContent}</div>
      </aside>
    </>
  );
}
