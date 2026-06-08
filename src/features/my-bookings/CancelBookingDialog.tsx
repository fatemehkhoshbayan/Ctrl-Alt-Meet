import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import type { IBooking, IEvent } from '@/services';
import { formatDate } from '@/utils';
import { useAppDispatch } from '@/store/hooks';
import { cancelBooking } from '@/store/bookings';
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
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOpenChange(next: boolean) {
    if (!next) setStep(1);
    onOpenChange(next);
  }

  async function handleConfirmCancel() {
    setIsSubmitting(true);
    try {
      const result = await dispatch(cancelBooking(booking.id));
      if (cancelBooking.fulfilled.match(result)) {
        toast.success('Booking cancelled successfully');
        handleOpenChange(false);
      } else {
        toast.error('Could not cancel booking. Please try again.');
      }
    } catch {
      toast.error('Could not cancel booking. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                <span className="text-on-surface font-bold">{event.title}</span> will be released and
                you will no longer have access to this event.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-3 sm:gap-3">
              <Button
                variant="outlined"
                color="secondary"
                BtnText="Go Back"
                className="flex-1"
                disabled={isSubmitting}
                onClick={() => setStep(1)}
              />
              <Button
                color="secondary"
                className="flex-1"
                disabled={isSubmitting}
                BtnText={isSubmitting ? 'Cancelling…' : 'Yes, Cancel Booking'}
                icon={isSubmitting ? <Loader2 size={18} className="animate-spin" /> : undefined}
                onClick={handleConfirmCancel}
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
