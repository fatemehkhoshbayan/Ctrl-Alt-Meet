import type { ReactNode } from 'react';
import { cn } from '@/lib';

interface IPreferenceStatusBadgeProps {
  enabled: boolean;
}

export function PreferenceStatusBadge({ enabled }: IPreferenceStatusBadgeProps) {
  return (
    <p
      className={cn(
        'text-label-sm shrink-0 rounded-full px-3 py-1 font-medium',
        enabled
          ? 'bg-primary/10 text-primary'
          : 'bg-surface-container-high text-on-surface-variant',
      )}
    >
      {enabled ? 'On' : 'Off'}
    </p>
  );
}

interface IPreferenceSummaryRowProps {
  label: string;
  description: string;
  value: ReactNode;
}

export function PreferenceSummaryRow({ label, description, value }: IPreferenceSummaryRowProps) {
  return (
    <li className="border-outline-variant/60 flex items-center justify-between gap-4 border-b py-4 first:pt-0 last:border-b-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-on-surface text-body-md font-medium">{label}</p>
        <p className="text-on-surface-variant text-label-sm mt-0.5">{description}</p>
      </div>
      <div className="shrink-0">{value}</div>
    </li>
  );
}
