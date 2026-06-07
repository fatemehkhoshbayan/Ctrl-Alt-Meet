import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RegistrationForm, RegistrationHeroSection } from '@/features';
import type { IEvent, TTicketTier } from '@/services';

interface IRegistrationState {
  event: IEvent;
  selectedTier: TTicketTier | null;
}

export default function Registration() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: IRegistrationState | null };

  useEffect(() => {
    if (!state?.event) {
      navigate(-1);
    }
  }, [state, navigate]);

  if (!state?.event) return null;

  const { event, selectedTier } = state;

  return (
    <>
      <RegistrationHeroSection event={event} />

      <section className="px-margin-mobile mx-auto py-12">
        <RegistrationForm
          event={event}
          initialTier={selectedTier}
          onClose={() => navigate(-1)}
        />
      </section>
    </>
  );
}
