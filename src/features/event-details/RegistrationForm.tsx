import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Ticket, ChevronRight, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { purchaseTicket, resetPurchaseStatus } from '@/store/bookings';
import type {
  IRegistrationFormProps,
  TAttendeeFormValues,
  TAttendeesFormValues,
  TBookingStep,
} from './types';
import type { TTicketTier } from '@/services';
import { Dialog, Button } from '@/ui';
import {
  AttendeeDetailsStep,
  TicketSelectionStep,
  BookingSummaryStep,
  SuccessView,
} from './registration-steps';

const attendeeSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number.')
    .regex(/^[+\d\s()-]+$/, 'Phone may only contain digits, spaces, and + ( ) -'),
});

const attendeesFormSchema = z.object({
  attendees: z.array(attendeeSchema).min(1),
});

// Kept in sync with attendeesFormSchema
type AttendeesFormValues = TAttendeesFormValues;

const STEP_TITLES: Record<TBookingStep, string> = {
  1: 'Select Tickets',
  2: 'Attendee Details',
  3: 'Confirmation',
};

function emptyAttendee(): TAttendeeFormValues {
  return { name: '', email: '', phone: '' };
}

export default function RegistrationForm({
  event,
  initialTier = null,
  onClose,
  onSuccess,
}: IRegistrationFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const purchaseStatus = useAppSelector(state => state.bookings.purchaseStatus);
  const bookingReference = useAppSelector(state => state.bookings.bookingReference);

  const [step, setStep] = useState<TBookingStep>(1);
  const [selectedTier, setSelectedTier] = useState<TTicketTier | null>(initialTier);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = selectedTier?.price ?? 0;
  const totalAmount = unitPrice * quantity;
  const maxQuantity = selectedTier?.available ?? 1;

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<AttendeesFormValues>({
    resolver: zodResolver(attendeesFormSchema),
    defaultValues: { attendees: [emptyAttendee()] },
    mode: 'onTouched',
  });

  const { fields } = useFieldArray({ control, name: 'attendees' });

  useEffect(() => {
    reset({ attendees: Array.from({ length: quantity }, emptyAttendee) });
  }, [quantity, reset]);

  useEffect(() => {
    if (selectedTier && quantity > selectedTier.available) {
      setQuantity(Math.max(1, selectedTier.available));
    }
  }, [selectedTier?.available, quantity]);

  const isStep1Valid = Boolean(selectedTier && quantity >= 1 && quantity <= selectedTier.available);

  const handleClose = () => {
    const wasSuccess = purchaseStatus === 'succeeded';
    dispatch(resetPurchaseStatus());
    if (wasSuccess) {
      onSuccess();
    } else {
      onClose();
    }
  };

  const goBack = () => {
    if (step > 1 && purchaseStatus !== 'succeeded') {
      setStep(prev => (prev - 1) as TBookingStep);
    }
  };

  const goNext = async () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
      return;
    }
    if (step === 2) {
      const valid = await trigger();
      if (valid) setStep(3);
    }
  };

  const onConfirmBooking = handleSubmit(async values => {
    if (!selectedTier) return;
    await dispatch(
      purchaseTicket({
        event,
        tierId: selectedTier.id,
        quantity,
        attendees: values.attendees,
      }),
    );
  });

  const isLoading = purchaseStatus === 'loading';
  const isSuccess = purchaseStatus === 'succeeded';
  const attendeeValues = watch('attendees');

  const dialogTitle = isSuccess ? 'Booking Confirmed' : STEP_TITLES[step];

  const dialogDescription = isSuccess ? (
    'Your tickets have been reserved successfully.'
  ) : step === 1 ? (
    <>{event.title} — choose your pass type and how many tickets you need.</>
  ) : step === 2 ? (
    `Enter details for each of your ${quantity} ticket${quantity > 1 ? 's' : ''}.`
  ) : (
    'Review your order before confirming.'
  );

  const dialogButtonText = isSuccess
    ? undefined
    : step === 1
      ? 'Continue to Attendee Details'
      : step === 2
        ? 'Review Booking'
        : `Confirm & Book — $${totalAmount.toLocaleString()}`;

  const dialogHeader = (
    <>
      {isSuccess ? undefined : (
        <p className="text-secondary text-label-sm font-semibold tracking-wide uppercase">
          {`Step ${step} of 3`}
        </p>
      )}
      <div className="mb-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Ticket size={25} className="text-primary" />
          <h3 className="font-headline-md text-headline-md text-white">{dialogTitle}</h3>
        </div>
        <p className="text-on-surface-variant text-label-sm">{dialogDescription}</p>
      </div>
    </>
  );

  const dialogActions = (
    <div className="pt-gutter flex flex-col gap-3 sm:flex-row">
      <Button
        onClick={!isSuccess ? (step === 3 ? onConfirmBooking : goNext) : undefined}
        type="button"
        disabled={isLoading || (step === 1 && !isStep1Valid)}
        className="bg-primary text-on-primary flex w-full items-center justify-center gap-2 rounded-full font-bold transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            {dialogButtonText}
            {step === 3 && !isSuccess ? undefined : <ChevronRight size={18} />}
          </>
        )}
      </Button>
      <Button
        onClick={!isSuccess && step > 1 ? goBack : handleClose}
        aria-label={!isSuccess && step > 1 ? 'Go back' : 'Cancel'}
        variant="outlined"
        color="secondary"
        size="md"
        className="w-full sm:w-auto"
      >
        {!isSuccess && step > 1 ? 'Back' : 'Cancel'}
      </Button>
    </div>
  );

  return (
    <Dialog
      handleClose={handleClose}
      header={dialogHeader}
      actions={dialogActions}
      footer={
        !isSuccess ? (
          <p className="text-outline text-label-sm text-center">
            No payment charged now. You will receive an invoice by email.
          </p>
        ) : undefined
      }
    >
      {isSuccess ? (
        <SuccessView
          bookingReference={bookingReference ?? ''}
          eventTitle={event.title}
          tierName={selectedTier?.name ?? ''}
          quantity={quantity}
          totalAmount={totalAmount}
          onDone={handleClose}
          onMyBookings={() => {
            handleClose();
            navigate('/my-booking');
          }}
        />
      ) : (
        <>
          {step === 1 && (
            <TicketSelectionStep
              selectedTier={selectedTier}
              onSelectTier={setSelectedTier}
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={maxQuantity}
              unitPrice={unitPrice}
              totalAmount={totalAmount}
            />
          )}
          {step === 2 && (
            <AttendeeDetailsStep fields={fields} register={register} errors={errors.attendees} />
          )}
          {step === 3 && selectedTier && (
            <BookingSummaryStep
              eventTitle={event.title}
              tier={selectedTier}
              quantity={quantity}
              totalAmount={totalAmount}
              attendees={attendeeValues ?? []}
            />
          )}
          {purchaseStatus === 'failed' && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </Dialog>
  );
}
