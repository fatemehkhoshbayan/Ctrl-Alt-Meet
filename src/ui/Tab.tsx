import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib';
import { Button } from '.';

interface ITabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface ITabsProps {
  tabs: ITabItem[];
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
}

export default function Tab({
  tabs,
  className,
  defaultValue,
  value,
  onValueChange,
  ariaLabel = 'Tabs',
}: ITabsProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? tabs[0]?.id);
  const activeTab = value ?? internalValue;
  const selectedTab = tabs.some(tab => tab.id === activeTab) ? activeTab : tabs[0]?.id;

  if (tabs.length === 0) return null;

  const getTabId = (tabId: string) => `${id}-tab-${tabId}`;
  const getPanelId = (tabId: string) => `${id}-panel-${tabId}`;

  const selectTab = (tabId: string) => {
    if (value === undefined) {
      setInternalValue(tabId);
    }

    onValueChange?.(tabId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const lastIndex = tabs.length - 1;
    const nextIndexByKey: Record<string, number> = {
      ArrowLeft: currentIndex === 0 ? lastIndex : currentIndex - 1,
      ArrowRight: currentIndex === lastIndex ? 0 : currentIndex + 1,
      Home: 0,
      End: lastIndex,
    };
    const nextIndex = nextIndexByKey[event.key];

    if (nextIndex === undefined) return;

    event.preventDefault();

    const nextTabId = tabs[nextIndex]?.id;
    if (!nextTabId) return;

    selectTab(nextTabId);
    document.getElementById(getTabId(nextTabId))?.focus();
  };

  return (
    <section className={cn(className)}>
      <div
        className="bg-surface-container-low my-16 flex w-fit items-center rounded-full"
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab, index) => {
          const isActive = selectedTab === tab.id;
          return (
            <Button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={getPanelId(tab.id)}
              id={getTabId(tab.id)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={event => handleKeyDown(event, index)}
              className={cn(
                'font-label-md text-label-md focus-visible:ring-primary cursor-pointer rounded-full px-8 py-3 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95',
                isActive
                  ? 'active-glow bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface bg-transparent shadow-none',
              )}
              BtnText={tab.label}
            />
          );
        })}
      </div>
      {tabs.map(tab => (
        <div
          key={tab.id}
          id={getPanelId(tab.id)}
          role="tabpanel"
          aria-labelledby={getTabId(tab.id)}
          tabIndex={0}
          hidden={selectedTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </section>
  );
}
