import type { IBookingSummaryStep } from '@/features';

export default function BookingSummaryStep({
  eventTitle,
  tier,
  quantity,
  totalAmount,
  attendees,
}: IBookingSummaryStep) {
  return (
    <section className="bg-surface-container text-on-surface-variant gap-stack-gap flex flex-col rounded-lg p-10">
      <h4 className="text-label-md font-semibold">Booking Summary</h4>
      <dl className="flex flex-col gap-4 text-right text-sm">
        <div className="flex justify-between gap-4">
          <dt>Event</dt>
          <dd className="font-medium">{eventTitle}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Pass</dt>
          <dd className="font-medium">{tier.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Quantity</dt>
          <dd className="font-medium">{quantity}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
          <dt className="font-semibold">Total</dt>
          <dd className="text-primary text-xl font-bold">${totalAmount.toLocaleString()}</dd>
        </div>
      </dl>
      <ul className="mt-2 border-t border-white/10">
        {attendees.map((attendee, index) => (
          <li key={index} className="text-label-sm gap-stack-gap flex py-2">
            <span className="text-on-surface-variant">Ticket {index + 1}: </span>
            <span className="text-till font-medium">{attendee.name || '—'}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
