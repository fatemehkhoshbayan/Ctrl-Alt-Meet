import { MapPin } from 'lucide-react';
import type { IEventProps } from './types';

export default function VenueCard({ event }: IEventProps) {
  return (
    <div className="glass-card text-on-surface hover:ring-secondary rounded-lg p-6 transition-all duration-700 hover:scale-105 hover:ring-1">
      <div className="mb-4 flex items-center gap-2">
        <MapPin size={30} className="text-secondary" />
        <h5 className="font-headline-sm text-secondary">Venue</h5>
      </div>
      <div className="bg-surface-container-high mb-4 h-60 overflow-hidden rounded-lg">
        <img
          src={event.venueImage}
          alt={`${event.venue} location`}
          className="h-full w-full object-cover grayscale transition-all duration-500 hover:ring-2 hover:grayscale-0"
        />
      </div>
      <div className="space-y-2">
        <p className="font-label-md">{event.venue}</p>
        <p className="text-on-surface-variant text-label-sm">
          {event.city}, {event.country}
        </p>
      </div>
    </div>
  );
}
