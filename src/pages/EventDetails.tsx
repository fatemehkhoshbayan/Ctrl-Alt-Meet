import { Suspense, use } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import {
  EventDetailsHeroSection,
  HighlightsSection,
  SpeakersSection,
  AboutSection,
  PassSelection,
} from '@/features';
import { Link } from '@/ui';
import { LoadingState } from '@/shared';
import type { EventDetailsLoaderData, EventsLoaderData } from '@/services';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export default function EventDetails() {
  const { event, speakers } = useLoaderData() as EventDetailsLoaderData;
  const { events: catalogEvents } = useRouteLoaderData('events-root') as EventsLoaderData;

  const catalogIndex = catalogEvents.findIndex(catalogEvent => catalogEvent.id === event.id);
  const prevEvent = catalogIndex > 0 ? catalogEvents[catalogIndex - 1] : null;
  const nextEvent =
    catalogIndex >= 0 && catalogIndex < catalogEvents.length - 1
      ? catalogEvents[catalogIndex + 1]
      : null;

  return (
    <>
      <EventDetailsHeroSection event={event} />
      <section className="px-page-inline mx-auto grid min-h-[35vh] w-full max-w-[1440px] grid-cols-1 gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16 xl:py-20">
        <div className="min-w-0 space-y-12 lg:col-span-8 xl:space-y-16">
          <AboutSection event={event} />
          <Suspense fallback={<LoadingState message="Loading speakers..." />}>
            <SpeakersSection speakers={use(speakers)} />
          </Suspense>
          <HighlightsSection event={event} />
          {(prevEvent || nextEvent) && (
            <nav className="border-outline-variant flex justify-between gap-4 border-t pt-8">
              {prevEvent ? <Link icon={<ArrowLeftIcon size={20} />} event={prevEvent} /> : <span />}
              {nextEvent ? (
                <Link icon={<ArrowRightIcon size={20} />} event={nextEvent} iconRight />
              ) : null}
            </nav>
          )}
        </div>
        <PassSelection event={event} />
      </section>
    </>
  );
}
