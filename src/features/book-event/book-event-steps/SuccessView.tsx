import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/ui';
import type { ISuccessViewProps } from '@/features';

export default function SuccessView({
  bookingReference,
  eventTitle,
  tierName,
  quantity,
  totalAmount,
  onDone,
  onMyBookings,
}: ISuccessViewProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="bg-primary/20 flex h-16 w-16 items-center justify-center rounded-full">
        <CheckCircle2 size={40} className="text-primary" />
      </div>
      <h3 className="font-headline-md text-headline-md text-white">You're in!</h3>
      <p className="text-on-surface-variant">
        {quantity} × <span className="text-primary font-semibold">{tierName}</span> for
        <span className="font-semibold text-white">{eventTitle}</span> — $
        {totalAmount.toLocaleString()} total. Check your inbox for the confirmation.
      </p>
      {bookingReference && (
        <p className="bg-surface-container text-on-surface w-full rounded-lg px-4 py-3 text-sm">
          Booking reference:{' '}
          <span className="text-primary font-mono font-bold">{bookingReference}</span>
        </p>
      )}
      <Button
        onClick={onMyBookings}
        className="bg-primary text-on-primary w-full rounded-full py-3 font-bold transition-all hover:brightness-110 active:scale-95"
        BtnText="View My Bookings"
      />
      <Button
        type="button"
        onClick={onDone}
        variant="outlined"
        color="secondary"
        size="md"
        className="w-full"
        BtnText="Done"
      />
    </div>
  );
}
