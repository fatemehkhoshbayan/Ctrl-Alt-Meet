import type { TTicketTier } from '@/services';
import type { TAttendeeFormValues } from '../types';

interface IBookingSummaryStep {
  eventTitle: string;
  tier: TTicketTier;
  quantity: number;
  totalAmount: number;
  attendees: TAttendeeFormValues[];
}

export default function BookingSummaryStep({
  eventTitle,
  tier,
  quantity,
  totalAmount,
  attendees,
}: IBookingSummaryStep) {
  return (
    <div className="bg-surface-container gap-stack-gap flex flex-col rounded-lg p-5">
      <h4 className="text-label-md font-semibold text-white">Booking Summary</h4>
      <dl className="text-on-surface-variant gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Event</dt>
          <dd className="text-right font-medium text-white">{eventTitle}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Pass</dt>
          <dd className="text-right font-medium text-white">{tier.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Quantity</dt>
          <dd className="text-right font-medium text-white">{quantity}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
          <dt className="font-semibold text-white">Total</dt>
          <dd className="text-primary text-right text-xl font-bold">
            ${totalAmount.toLocaleString()}
          </dd>
        </div>
      </dl>
      <ul className="mt-2 space-y-2 border-t border-white/10 pt-3">
        {attendees.map((attendee, index) => (
          <li key={index} className="text-label-sm">
            <span className="text-on-surface-variant">Ticket {index + 1}: </span>
            <span className="text-white">{attendee.name || '—'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
