import { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetPurchaseStatus, setPurchaseError, setPurchaseStatus } from '@/store/bookings';
import { buildCreateBookingPayload, useCreateBooking, usePurchaseTicket } from '@/services';
import { getPassSchema } from '@/schemas';
import type { IEvent, TTicketTier } from '@/services';
import type { TAttendeesFormValues, TBookingStep } from '@/features';

// ─── Step config ────────────────────────────────────────────────────────────

const TOTAL_STEPS = 3;

const STEP_TITLES: Record<TBookingStep, string> = {
  1: 'Select Tickets',
  2: 'Attendee Details',
  3: 'Confirmation',
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export interface IUseRegistrationFormOptions {
  event: IEvent;
  initialTier?: TTicketTier | null;
  onClose: () => void;
}

export function useRegistrationForm({
  event,
  initialTier = null,
  onClose,
}: IUseRegistrationFormOptions) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { mutate: purchaseEventTickets, isPending: isUpdatingTickets } = usePurchaseTicket();
  const { mutate: createBooking, isPending: isCreatingBooking } = useCreateBooking();

  const purchaseStatus = useAppSelector(bookingState => bookingState.bookings.purchaseStatus);

  // ── Step state ──────────────────────────────────────────────────────────
  const [step, setStep] = useState<TBookingStep>(1);
  const goToNextStep = () => setStep(s => (s < TOTAL_STEPS ? ((s + 1) as TBookingStep) : s));
  const goToPreviousStep = () => setStep(s => (s > 1 ? ((s - 1) as TBookingStep) : s));
  const isFirstStep = step === 1;
  const isLastStep = step === TOTAL_STEPS;
  const title = STEP_TITLES[step];

  // ── Booking state ────────────────────────────────────────────────────────
  const [selectedTier, setSelectedTier] = useState<TTicketTier | null>(initialTier);
  const [quantity, setQuantity] = useState(1);

  const tiers = event.ticketTiers ?? [];
  const unitPrice = selectedTier?.price ?? 0;
  const totalAmount = unitPrice * quantity;
  const maxQuantity = selectedTier?.available ?? 1;
  const isStep1Valid = Boolean(selectedTier && quantity >= 1 && quantity <= selectedTier.available);

  // ── Form ─────────────────────────────────────────────────────────────────
  const methods = useForm<TAttendeesFormValues>({
    resolver: zodResolver(getPassSchema),
    defaultValues: { attendees: [{ name: '', email: '', phone: '' }] },
    mode: 'onTouched',
  });

  const { control, handleSubmit, trigger } = methods;
  const { replace } = useFieldArray({ control, name: 'attendees' });
  const attendeeValues = useWatch({ control, name: 'attendees' });

  useEffect(() => {
    replace(Array.from({ length: quantity }, () => ({ name: '', email: '', phone: '' })));
  }, [quantity, replace]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSelectTier = (tier: TTicketTier) => {
    setSelectedTier(tier);
    setQuantity(current => Math.min(current, Math.max(1, tier.available)));
  };

  const cancel = () => {
    dispatch(resetPurchaseStatus());
    onClose();
  };

  const goBack = () => {
    if (!isFirstStep) goToPreviousStep();
  };

  const goNext = async () => {
    if (step === 1 && isStep1Valid) {
      goToNextStep();
      return;
    }
    if (step === 2) {
      const valid = await trigger('attendees');
      if (valid) goToNextStep();
    }
  };

  const onConfirmBooking = handleSubmit(async values => {
    if (!selectedTier || !user) return;

    const updatedTiers = event.ticketTiers.map(tier =>
      tier.id === selectedTier.id
        ? { ...tier, available: Math.max(0, tier.available - quantity) }
        : tier,
    );

    dispatch(setPurchaseStatus('loading'));

    try {
      purchaseEventTickets({ eventId: event.id, updatedTiers });

      const payload = buildCreateBookingPayload({
        event,
        tierId: selectedTier.id,
        quantity,
        attendees: values.attendees,
        userId: user.id,
      });

      createBooking(payload);

      dispatch(setPurchaseStatus('idle'));
      toast.success('Booking Confirmed!', {
        description: `${event.title} · ${selectedTier.name} · ${quantity} ticket${quantity > 1 ? 's' : ''}`,
        duration: 8000,
      });
      navigate('/my-bookings');
    } catch (error) {
      dispatch(setPurchaseError(error instanceof Error ? error.message : 'Booking failed'));
    }
  });

  return {
    // form
    methods,
    attendeeValues: attendeeValues ?? [],
    // step
    step,
    title,
    totalSteps: TOTAL_STEPS,
    isFirstStep,
    isLastStep,
    // booking
    tiers,
    selectedTier,
    quantity,
    unitPrice,
    totalAmount,
    maxQuantity,
    isStep1Valid,
    isLoading: isUpdatingTickets || isCreatingBooking || purchaseStatus === 'loading',
    purchaseStatus,
    // handlers
    handleSelectTier,
    setQuantity,
    goBack,
    goNext,
    onConfirmBooking,
    cancel,
  };
}
