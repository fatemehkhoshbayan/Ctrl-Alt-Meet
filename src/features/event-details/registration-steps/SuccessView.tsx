import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/ui';

interface ISuccessView {
  bookingReference: string;
  eventTitle: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
  onDone: () => void;
  onMyBookings: () => void;
}

export default function SuccessView({
  bookingReference,
  eventTitle,
  tierName,
  quantity,
  totalAmount,
  onDone,
  onMyBookings,
}: ISuccessView) {
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
        className="bg-primary text-on-primary w-full rounded-full py-3 font-bold transition-all hover:brightness-110"
        BtnText="My Bookings"
      />
      <Button
        type="button"
        onClick={onDone}
        className="bg-primary text-on-primary w-full rounded-full py-3 font-bold transition-all hover:brightness-110"
        BtnText="Done"
      />
    </div>
  );
}
