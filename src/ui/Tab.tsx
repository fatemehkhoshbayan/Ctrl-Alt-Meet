import { useState, type ReactNode } from 'react';
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
}

export default function Tab({ tabs, className }: ITabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  if (tabs.length === 0) return null;

  return (
    <section className={cn(className)}>
      <div
        className="bg-surface-container-low my-16 flex w-fit items-center rounded-full"
        role="tablist"
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'font-label-md text-label-md rounded-full transition-all duration-300',
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
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </section>
  );
}
