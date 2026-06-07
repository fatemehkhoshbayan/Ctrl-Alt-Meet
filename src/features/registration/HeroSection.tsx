import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, MapPinned } from 'lucide-react';
import { formatDate } from '@/utils';
import type { IEvent } from '@/services';
import { Button } from '@/ui';

export default function HeroSection({ event }: { event: IEvent }) {
  const navigate = useNavigate();

  return (
    <section className="relative h-64 w-full overflow-hidden md:h-100">
      <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />

      <Button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
        BtnText="Back"
        size="sm"
        icon={<ArrowLeft size={16} />}
      />

      <div className="absolute bottom-0 left-0 px-80 pb-12">
        <div className="gap-stack-gap text-primary flex flex-col rounded-2xl bg-black/40 px-8 py-6 backdrop-blur-sm">
          <h3 className="mb-2 font-semibold tracking-widest uppercase">Registration</h3>
          <h1 className="text-headline-md mb-3 max-w-2xl">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-8 text-white/70">
            <span className="flex items-center gap-2 text-sm">
              <CalendarDays size={16} className="text-primary" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2 text-sm">
              <MapPinned size={16} className="text-secondary" />
              {event.venue}, {event.country}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
