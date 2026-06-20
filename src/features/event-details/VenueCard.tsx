import { MapPin } from 'lucide-react';
import type { IEventProps } from '../types';

export default function VenueCard({ event }: IEventProps) {
  return (
    <div className="glass-card gap-stack-gap text-on-surface hover:ring-secondary flex flex-col rounded-lg p-8 transition-all duration-700 hover:scale-105 hover:ring-1">
      <div className="flex items-center gap-2">
        <MapPin size={40} className="text-secondary" />
        <h4 className="font-headline-lg text-headline-lg text-secondary">Venue</h4>
      </div>
      <div className="bg-surface-container-high mb-4 h-60 overflow-hidden rounded-lg">
        <img
          src={event.venueImage}
          alt={`${event.venue} location`}
          className="h-full w-full object-cover grayscale transition-all duration-500 hover:ring-2 hover:grayscale-0"
        />
      </div>
      <div className="space-y-2">
        <p className="font-headline-md text-headline-md">{event.venue}</p>
        <p className="text-on-surface-variant text-body-xl">
          {event.city}, {event.country}
        </p>
      </div>
    </div>
  );
}
