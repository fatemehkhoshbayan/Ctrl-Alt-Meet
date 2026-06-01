import { CalendarDays, MapPinned, UsersRound, Sparkles } from 'lucide-react';
import { formatDate } from '@/utils';
import type { IEventProps } from './types';

export default function HeroSection({ event }: IEventProps) {
  return (
    <section className="relative h-[614px] w-full overflow-hidden">
      <img
        alt={event.title}
        className="h-full w-full object-cover"
        data-alt={event.description}
        src={event.imageUrl}
      />
      <div className="hero-gradient absolute inset-0"></div>
      <div className="absolute bottom-0 left-0 px-32 pb-12">
        <div className="gap-stack-gap flex w-fit flex-col rounded-2xl bg-black/40 px-8 py-6 backdrop-blur-sm">
          <div className="gap-stack-gap bg-primary/50 border-primary-container/30 text-on-primary inline-flex w-fit items-center rounded-full border px-4 py-1">
            <Sparkles size={20} />
            <span className="font-label-sm text-label-sm tracking-wider uppercase">
              Flagship Event 2024
            </span>
          </div>
          <h2 className="font-display-lg text-display-lg mb-base max-w-3xl text-white">
            {event.title}: {event.category}
          </h2>
          <div className="flex flex-wrap items-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CalendarDays size={20} className="text-primary" />
              <span className="font-label-md text-label-md">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinned size={20} className="text-till" />
              <span className="font-label-md text-label-md">
                {event.venue}, {event.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UsersRound size={20} className="text-secondary" />
              <span className="font-label-md text-label-md">{event.attendeeCount}+ Attendees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
