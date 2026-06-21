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
      <section className="px-margin-mobile md:px-margin-desktop mx-auto grid min-h-[35vh] grid-cols-1 gap-12 p-32 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-8">
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
