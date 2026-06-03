import { BadgeCheck, CalendarClock, MapPin } from 'lucide-react';
import { cn } from '@/lib';
import type { IBooking, IEvent } from '@/services';
import { formatDate } from '@/utils';
import { Button } from '../../ui';

export type TBookingCardStatus = 'upcoming' | 'past';

export default function BookingCard({
  booking,
  event,
  status = 'upcoming',
}: {
  booking: IBooking;
  event: IEvent;
  status?: TBookingCardStatus;
}) {
  const isPast = status === 'past';

  return (
    <article
      className={cn(
        'group bg-surface-container-low border-outline-variant/30 shadow-primary/10 flex h-full flex-col overflow-hidden rounded-[2rem] border shadow-2xl transition-all duration-300 hover:-translate-y-1',
        isPast && 'opacity-85',
      )}
    >
      <div className="relative h-64 overflow-hidden md:h-72">
        <img
          className={cn(
            'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
            isPast && 'grayscale',
          )}
          src={event.imageUrl}
          alt={event.title}
        />

        <div
          className={cn(
            'font-label-md text-label-md absolute top-5 right-5 flex items-center gap-2 rounded-full px-5 py-2 font-bold shadow-lg',
            isPast
              ? 'bg-surface-container-high text-on-surface-variant'
              : 'bg-secondary text-on-secondary',
          )}
        >
          <BadgeCheck size={22} />
          {isPast ? 'Done' : "You're In!"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="bg-primary/15 border-primary/20 text-primary font-label-md text-label-md rounded-full border px-5 py-2 font-bold">
            {event.category}
          </span>
          <span className="text-on-surface-variant font-label-md text-label-md font-bold">
            • {formatDate(booking.eventDate)}
          </span>
        </div>

        <h3 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface group-hover:text-primary mb-8 transition-colors">
          {event.title}
        </h3>

        <div className="mb-8 flex flex-col gap-3">
          <div className="text-on-surface-variant text-body-lg flex items-center gap-4 font-bold">
            <MapPin size={24} className="shrink-0" />
            <span>{event.location}</span>
          </div>

          <div className="text-on-surface-variant text-body-lg flex items-center gap-4 font-bold">
            <CalendarClock size={24} className="shrink-0" />
            <span>
              {event.time} - {event.endTime}
            </span>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4">
          <Button BtnText={isPast ? 'View Details' : 'View Ticket'} />
          <Button
            className={cn(
              'transition-all active:scale-95',
              isPast
                ? 'border-outline-variant text-on-surface-variant cursor-default'
                : 'border-secondary text-secondary hover:bg-secondary/20',
            )}
            disabled={isPast}
            BtnText={isPast ? 'Completed' : 'Manage'}
            variant="outlined"
          />
        </div>
      </div>
    </article>
  );
}
