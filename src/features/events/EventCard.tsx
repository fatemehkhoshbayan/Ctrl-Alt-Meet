import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib';
import type { IEvent, TTicketTier } from '@/services';
import { formatDateRange, getCategoryTheme } from '@/utils';

interface IEventCardProps {
  event: IEvent;
}

function getStartingPrice(tiers: TTicketTier[]): string {
  if (!tiers.length) return 'TBD';
  const min = Math.min(...tiers.map(t => t.price));
  return min === 0 ? 'FREE' : `$${min}`;
}

export default function EventCard({ event }: IEventCardProps) {
  const theme = getCategoryTheme(event.category);
  const navigate = useNavigate();

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
      <div className="relative h-48">
        <img
          alt={event.shortDescription}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          src={event.imageUrl}
        />
        <div
          className={cn(
            'font-label-sm text-label-sm absolute top-4 left-4 rounded-full px-3 py-1',
            theme.badge,
          )}
        >
          {event.category.toUpperCase()}
        </div>
      </div>

      <div className="p-6">
        <div className="text-secondary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          <span className="font-label-sm text-label-sm">
            {formatDateRange(event.date, event.endDate)}
          </span>
        </div>

        <h3
          className={cn(
            'font-headline-sm text-headline-sm text-on-surface mb-3 transition-colors',
            theme.titleHover,
          )}
        >
          {event.title}
        </h3>

        <div className="text-on-surface-variant font-body-md text-body-md mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span>
            {event.venue}, {event.city}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            {getStartingPrice(event.ticketTiers)}
          </span>
          <button
            className={cn(
              'font-label-md text-label-md rounded-full px-4 py-2 transition-all',
              theme.button,
            )}
          >
            Book Spot
          </button>
        </div>
      </div>
    </article>
  );
}
