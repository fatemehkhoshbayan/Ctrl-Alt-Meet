import { useEffect } from 'react';
import { cn } from '@/lib';
import { Button, Select } from '@/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories } from '@/store/categories';
import { setFilters, resetFilters, DEFAULT_FILTERS } from '@/store/events';
import { DATE_RANGE_OPTIONS } from './constant';

export default function SideBar({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.items);
  const filters = useAppSelector(state => state.events.filters);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function toggleCategory(id: string) {
    const next = filters.categories.includes(id)
      ? filters.categories.filter(c => c !== id)
      : [...filters.categories, id];
    dispatch(setFilters({ categories: next }));
  }

  function handleReset() {
    dispatch(resetFilters());
  }

  return (
    <aside className={cn('lg:block', className)}>
      <div className="bg-surface-container-low sticky top-32 rounded-lg p-6">
        <h3 className="font-headline-md text-headline-md mb-6">Filters</h3>
        <div className="space-y-8">
          <div>
            <p className="font-label-md text-label-md text-secondary mb-4 tracking-widest uppercase">
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
          {/* <!-- Date Range --> */}
          <div>
            <p className="font-label-md text-label-md text-secondary mb-4 tracking-widest uppercase">
              Date Range
            </p>
            <Select
              id="date-range"
              className="select select-option border-outline-variant text-label-md hover:border-primary flex w-full items-center justify-between rounded-full border px-4 py-2 text-left transition-colors"
              options={DATE_RANGE_OPTIONS}
              value={filters.dateRange}
              onChangeOption={val => dispatch(setFilters({ dateRange: val }))}
            />
          </div>
          {/* <!-- Price --> */}
          <div>
            <p className="font-label-md text-label-md text-secondary mb-4 tracking-widest uppercase">
              Price Range
            </p>
            <input
              className="accent-primary bg-outline-variant h-2 w-full appearance-none rounded-full"
              type="range"
              min={0}
              max={DEFAULT_FILTERS.priceMax}
              value={filters.priceMax}
              onChange={e => dispatch(setFilters({ priceMax: Number(e.target.value) }))}
            />
            <div className="font-label-md text-label-md text-on-surface-variant mt-2 flex justify-between">
              <span>$0</span>
              <span>
                $
                {filters.priceMax >= DEFAULT_FILTERS.priceMax
                  ? `${DEFAULT_FILTERS.priceMax}+`
                  : filters.priceMax}
              </span>
            </div>
          </div>
          <Button size="sm" className="w-full" BtnText="Reset All" onClick={handleReset} />
        </div>
      </div>
    </aside>
  );
}
