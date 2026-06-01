import { useState } from 'react';
import { IdCardLanyard, Ticket } from 'lucide-react';
import type { IEventProps } from './types';
import type { TTicketTier } from '@/services';
import { Button } from '@/ui';
import { useAppDispatch } from '@/store/hooks';
import { resetPurchaseStatus } from '@/store/bookings';
import PassCard from './PassCard';
import VenueCard from './VenueCard';
import RegistrationForm from './RegistrationForm';
import { useNavigate } from 'react-router-dom';

export default function BookingCard({ event }: IEventProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<TTicketTier | null>(null);
  const [showForm, setShowForm] = useState(false);

  const tiers = event.ticketTiers ?? [];

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedTier(null);
    navigate('/my-booking');
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <section className="lg:col-span-4">
      <div className="sticky top-24 space-y-6">
        <div className="bg-surface-container rounded-lg p-8">
          <div className="mb-6 flex items-center gap-2">
            <IdCardLanyard size={30} className="text-secondary" />
            <h3 className="font-headline-sm text-headline-md text-secondary">Choose Your Pass</h3>
          </div>

          <div className="mb-6 space-y-3" role="group" aria-label="Ticket tiers">
            {tiers.map(tier => (
              <PassCard
                key={tier.id}
                tier={tier}
                isSelected={selectedTier?.id === tier.id}
                onSelect={setSelectedTier}
              />
            ))}
          </div>

          <Button
            icon={<Ticket size={20} />}
            BtnText={selectedTier ? `Book ${selectedTier.name}` : 'Book Tickets'}
            disabled={tiers.length === 0}
            size="lg"
            onClick={() => {
              dispatch(resetPurchaseStatus());
              setShowForm(true);
            }}
            className="bg-primary text-on-primary gap-stack-gap mb-4 flex w-full font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 disabled:active:scale-100"
          />

          <p className="text-label-sm text-outline text-center">
            No hidden fees. Full refund before Oct 1st.
          </p>
        </div>

        <VenueCard event={event} />
      </div>

      {showForm && (
        <RegistrationForm
          event={event}
          initialTier={selectedTier}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
}
