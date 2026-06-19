import { Link as RouterLink } from 'react-router-dom';
import type { IEvent } from '@/services';

interface ILinkProps {
  icon: React.ReactNode;
  event: IEvent;
  iconRight?: boolean;
}

export default function Link({ icon, event, iconRight = false }: ILinkProps) {
  return (
    <RouterLink
      to={`/events/${event.id}`}
      className="text-primary font-label-md text-label-md hover:bg-surface-variant rounded-full transition-all duration-300"
    >
      <div className="flex items-center justify-center gap-2 rounded-full border px-4 py-2">
        {!iconRight && icon}
        <span>{event.title}</span>
        {iconRight && icon}
      </div>
    </RouterLink>
  );
}
