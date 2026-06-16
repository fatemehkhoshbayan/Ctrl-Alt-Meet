import { useParams } from 'react-router-dom';
import {
  EventDetailsHeroSection,
  HighlightsSection,
  SpeakersSection,
  AboutSection,
  PassSelection,
} from '@/features';
import { EmptyState, ErrorState, FallbackPage } from '@/shared';
import { useEventByIdQuery, useSpeakersByIdsQuery } from '@/services';
import { CalendarOff } from 'lucide-react';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: event, isLoading, isError, error } = useEventByIdQuery(id);
  const { data: speakers = [] } = useSpeakersByIdsQuery(event?.speakers);

  if (isLoading) {
    return <FallbackPage message="Loading event..." />;
  }

  if (isError) {
    return <ErrorState error={error?.message ?? 'Failed to load event'} />;
  }

  if (!event) {
    return (
      <EmptyState
        icon={<CalendarOff size={48} className="text-primary" />}
        title="No event found"
        message="The event you are looking for does not exist."
      />
    );
  }

  return (
    <>
      <EventDetailsHeroSection event={event} />
      <section className="px-margin-mobile md:px-margin-desktop mx-auto grid grid-cols-1 gap-12 p-32 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-8">
          <AboutSection event={event} />
          <SpeakersSection speakers={speakers} />
          <HighlightsSection event={event} />
        </div>
        <PassSelection event={event} />
      </section>
    </>
  );
}
