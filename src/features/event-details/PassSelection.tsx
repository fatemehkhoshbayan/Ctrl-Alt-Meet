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
      <div className="gap-stack-gutter sticky top-24 flex flex-col">
        <div className="bg-surface-container rounded-lg p-8">
          <div className="mb-6 flex items-center gap-2">
            <IdCardLanyard size={40} className="text-secondary" />
            <h3 className="font-headline-lg text-headline-lg text-secondary">Choose Your Pass</h3>
          </div>

          <div className="gap-stack-gap mb-6 flex flex-col" role="group" aria-label="Ticket tiers">
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
            icon={<Ticket size={40} />}
            BtnText={selectedTier ? `Book ${selectedTier.name}` : 'Book Tickets'}
            disabled={tiers.length === 0}
            size="lg"
            onClick={() => {
              dispatch(resetPurchaseStatus());
              if (!user) {
                navigate('/login', {
                  state: { from: `/book/${event.id}`, event, selectedTier },
                });
                return;
              }
              navigate(`/book/${event.id}`, { state: { event, selectedTier } });
            }}
            className="gap-stack-gap flex w-full"
          />

          <p className="text-body-lg text-outline pt-6 text-center">
            No hidden fees. Full refund before Oct 1st.
          </p>
        </div>

        <VenueCard event={event} />
      </div>
    </section>
  );
}
