import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  EventDetailsHeroSection,
  HighlightsSection,
  SpeakersSection,
  AboutSection,
  PassSelection,
} from '@/features';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSpeakers, selectSpeakersByIds } from '@/store/speakers';
import { fetchEventDetails } from '@/store/events/eventDetails.slice';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const event = useAppSelector(state => state.eventDetails.event);

  const speakerSelector = useMemo(() => selectSpeakersByIds(event.speakers), [event.speakers]);
  const speakers = useAppSelector(speakerSelector);

  useEffect(() => {
    if (id) dispatch(fetchEventDetails(id));
    dispatch(fetchSpeakers());
  }, [dispatch, id]);

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
