import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdCardLanyard, Ticket } from 'lucide-react';
import type { TTicketTier } from '@/services';
import { Button } from '@/ui';
import { useAuth } from '@/hooks';
import { useAppDispatch } from '@/store/hooks';
import { resetPurchaseStatus } from '@/store/bookings';
import { PassCard } from '@/shared';
import VenueCard from './VenueCard';
import type { IEventProps } from '../types';

export default function PassSelection({ event }: IEventProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<TTicketTier | null>(null);

  const tiers = event.ticketTiers ?? [];

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
              if (!user) {
                navigate('/login', {
                  state: { from: '/registration', event, selectedTier },
                });
                return;
              }
              navigate('/registration', { state: { event, selectedTier } });
            }}
            className="bg-primary text-on-primary gap-stack-gap mb-4 flex w-full font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 disabled:active:scale-100"
          />

          <p className="text-label-sm text-outline text-center">
            No hidden fees. Full refund before Oct 1st.
          </p>
        </div>

        <VenueCard event={event} />
      </div>
    </section>
  );
}
