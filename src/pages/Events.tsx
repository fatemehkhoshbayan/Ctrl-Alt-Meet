import { useRouteLoaderData } from 'react-router-dom';
import { EventsPageHeroSection, EventsList } from '@/features';
import type { EventsLoaderData } from '@/services';

export default function Events() {
  const { events } = useRouteLoaderData('events-root') as EventsLoaderData;

  return (
    <>
      <EventsPageHeroSection />
      <EventsList events={events} />
    </>
  );
}
