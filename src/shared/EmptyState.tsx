import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  children?: ReactNode;
}

export default function EmptyState({
  icon = <Inbox size={48} className="text-primary" />,
  title = 'Nothing here yet',
  message = 'Check back soon.',
  children,
}: EmptyStateProps) {
  return (
    <section className="bg-surface-container border-surface-variant gap-gutter flex flex-col items-center justify-center overflow-hidden rounded-lg border py-32">
      {icon}
      <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
      {children}
    </section>
  );
}
