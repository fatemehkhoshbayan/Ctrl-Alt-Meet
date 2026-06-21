import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { BookEventForm, BookEventHeroSection } from '@/features';
import type { BookingLoaderData, TTicketTier } from '@/services';

export default function BookEvent() {
  const navigate = useNavigate();
  const { event } = useLoaderData() as BookingLoaderData;
  const { state } = useLocation() as { state: { selectedTier: TTicketTier | null } | null };
  const selectedTier = state?.selectedTier ?? null;

  return (
    <>
      <BookEventHeroSection event={event} />

      <section className="px-margin-mobile mx-auto min-h-[35vh] py-12">
        <BookEventForm event={event} initialTier={selectedTier} onClose={() => navigate(-1)} />
      </section>
    </>
  );
}
