import type { ReactNode } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/ui';

interface IProfileSectionCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  onEdit?: () => void;
  editLabel?: string;
  children: ReactNode;
}

export default function ProfileSectionCard({
  icon,
  title,
  description,
  onEdit,
  editLabel = 'Edit',
  children,
}: IProfileSectionCardProps) {
  return (
    <section className="gap-stack-gutter p-gutter flex flex-col py-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-4">
            {icon && icon}
            <h1 className="font-headline-lg text-headline-lg text-primary">{title}</h1>
          </div>
          {description && (
            <p className="text-on-surface-variant text-label-md p-2">{description}</p>
          )}
        </div>
        {onEdit && (
          <Button
            type="button"
            color="secondary"
            size="sm"
            BtnText={editLabel}
            onClick={onEdit}
            icon={<Pencil size={16} />}
            className="shrink-0"
          />
        )}
      </div>
      {children}
    </section>
  );
}
