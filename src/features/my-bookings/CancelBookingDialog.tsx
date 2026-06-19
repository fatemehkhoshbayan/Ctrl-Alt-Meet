import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { useCancelBooking, type IBooking, type IEvent } from '@/services';
import { formatDate } from '@/utils';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui';

interface ICancelBookingDialogProps {
  booking: IBooking;
  event: IEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CancelBookingDialog({
  booking,
  event,
  open,
  onOpenChange,
}: ICancelBookingDialogProps) {
  const { mutate: cancelBooking, isPending } = useCancelBooking();
  const [step, setStep] = useState<1 | 2>(1);

  function handleOpenChange(next: boolean) {
    if (!next) setStep(1);
    onOpenChange(next);
  }

  async function handleConfirmCancel() {
    try {
      await cancelBooking(booking.id);
      toast.success('Booking cancelled successfully');
      handleOpenChange(false);
    } catch {
      toast.error('Could not cancel booking. Please try again.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-outline-variant/40 bg-surface-container-low text-primary sm:max-w-md sm:rounded-[2rem]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <div className="bg-secondary/15 text-secondary mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                <AlertTriangle size={24} />
              </div>
              <DialogTitle className="text-headline-lg-mobile md:text-headline-lg">
                Cancel this booking?
              </DialogTitle>
              <DialogDescription className="text-body-lg leading-relaxed">
                You are about to cancel your tickets for this event. Review the details below before
                continuing.
              </DialogDescription>
            </DialogHeader>

            <dl className="border-outline-variant/40 bg-surface-container text-body-md grid gap-3 rounded-2xl border p-5">
              <div>
                <dt className="text-on-surface-variant">Event</dt>
                <dd className="text-on-surface font-bold">{event.title}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">Date</dt>
                <dd className="text-on-surface font-bold">{formatDate(booking.eventDate)}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">Reference</dt>
                <dd className="text-on-surface font-bold">{booking.bookingReference}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">Tickets</dt>
                <dd className="text-on-surface font-bold">
                  {booking.quantity}× {booking.ticketTierName}
                </dd>
              </div>
            </dl>

            <DialogFooter className="gap-3 sm:gap-3">
              <Button
                variant="outlined"
                color="secondary"
                BtnText="Keep Booking"
                className="flex-1"
                onClick={() => handleOpenChange(false)}
              />
              <Button BtnText="Continue" className="flex-1" onClick={() => setStep(2)} />
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-headline-lg-mobile md:text-headline-lg">
                Confirm cancellation
              </DialogTitle>
              <DialogDescription className="text-body-lg leading-relaxed">
                This action cannot be undone. Your tickets for{' '}
                <span className="text-on-surface font-bold">{event.title}</span> will be released
                and you will no longer have access to this event.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-3 sm:gap-3">
              <Button
                variant="outlined"
                color="secondary"
                BtnText="Go Back"
                className="flex-1"
                disabled={isPending}
                onClick={() => setStep(1)}
              />
              <Button
                color="secondary"
                className="flex-1"
                disabled={isPending}
                BtnText={isPending ? 'Cancelling…' : 'Yes, Cancel Booking'}
                icon={isPending ? <Loader2 size={18} className="animate-spin" /> : undefined}
                onClick={handleConfirmCancel}
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
