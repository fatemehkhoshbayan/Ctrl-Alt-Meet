import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib';
import type { IEvent, TTicketTier } from '@/services';
import { formatDateRange, getCategoryTheme } from '@/utils';
import FavoriteButton from './FavoriteButton';

interface IEventCardProps {
  event: IEvent;
  variant?: 'default' | 'compact';
}

function getStartingPrice(tiers: TTicketTier[]): string {
  if (!tiers.length) return 'TBD';
  const min = Math.min(...tiers.map(t => t.price));
  return min === 0 ? 'FREE' : `$${min}`;
}

export default function EventCard({ event, variant = 'default' }: IEventCardProps) {
  const theme = getCategoryTheme(event.category);
  const navigate = useNavigate();
  const isCompact = variant === 'compact';

  return (
    <article
      className={cn(
        'group bg-surface-container border-surface-variant overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-2',
        theme.border,
      )}
      onClick={() => {
        navigate(`/events/${event.id}`);
      }}
    >
      <div className={cn('relative', isCompact ? 'h-32' : 'h-48')}>
        <img
          alt={event.shortDescription}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          src={event.imageUrl}
        />
        <div
          className={cn(
            'font-label-sm text-label-sm absolute top-3 left-3 rounded-full px-3 py-1',
            isCompact && 'top-2 left-2 px-2 py-0.5 text-xs',
            theme.badge,
          )}
        >
          {event.category.toUpperCase()}
        </div>
      </div>

      <div className={cn(isCompact ? 'p-4' : 'p-6')}>
        <div className="text-secondary mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={isCompact ? 16 : 18} />
            <span className={cn('font-label-sm', isCompact ? 'text-label-sm' : 'text-label-sm')}>
              {formatDateRange(event.date, event.endDate)}
            </span>
          </div>
          <FavoriteButton eventId={event.id} size={isCompact ? 18 : 20} />
        </div>

        <h3
          className={cn(
            'text-on-surface mb-3 transition-colors',
            isCompact
              ? 'font-label-lg text-label-lg line-clamp-2'
              : cn('font-headline-sm text-headline-sm', theme.titleHover),
          )}
        >
          {event.title}
        </h3>

        <div
          className={cn(
            'text-on-surface-variant flex items-center gap-2',
            isCompact ? 'font-body-md text-body-md mb-3' : 'font-body-md text-body-md mb-6',
          )}
        >
          <MapPin size={isCompact ? 16 : 18} className="shrink-0" />
          <span className="line-clamp-1">
            {event.venue}, {event.city}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-on-surface',
              isCompact ? 'font-label-md text-label-md' : 'font-headline-sm text-headline-sm',
            )}
          >
            {getStartingPrice(event.ticketTiers)}
          </span>
          {!isCompact && (
            <button
              className={cn(
                'font-label-md text-label-md rounded-full px-4 py-2 transition-all',
                theme.button,
              )}
            >
              Book Spot
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
