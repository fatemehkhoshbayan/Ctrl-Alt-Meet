import { FormProvider } from 'react-hook-form';
import { Ticket } from 'lucide-react';

import { useRegistrationForm } from '@/hooks';
import type { IRegistrationFormProps } from '../types';
import { AttendeeDetailsStep, TicketSelectionStep, BookingSummaryStep, FormFooter } from '.';

export default function BookEventForm({
  event,
  initialTier = null,
  onClose,
}: IRegistrationFormProps) {
  const {
    methods,
    attendeeValues,
    step,
    title,
    totalSteps,
    tiers,
    selectedTier,
    quantity,
    unitPrice,
    totalAmount,
    maxQuantity,
    isStep1Valid,
    isFirstStep,
    isLastStep,
    isLoading,
    purchaseStatus,
    optimisticBooking,
    handleSelectTier,
    setQuantity,
    goBack,
    goNext,
    onConfirmBooking,
    cancel,
  } = useRegistrationForm({ event, initialTier, onClose });

  const description =
    step === 1 ? (
      <>{event.title} — choose your pass type and how many tickets you need.</>
    ) : step === 2 ? (
      `Enter details for each of your ${quantity} ticket${quantity > 1 ? 's' : ''}.`
    ) : (
      'Review your order before confirming.'
    );

  return (
    <div className="min-w-3xl p-6 sm:p-10">
      <div className="py-stack-gap flex items-center justify-between gap-2">
        <p className="text-secondary text-label-sm font-semibold tracking-wide uppercase">
          Step {step} of {totalSteps}
        </p>
        <div className="flex items-center gap-2">
          <Ticket size={22} className="text-primary" />
          <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
        </div>
      </div>

      <p className="text-on-surface-variant py-stack-gap text-label-sm">{description}</p>

      <FormProvider {...methods}>
        <div className="mx-auto w-full max-w-2xl">
          {step === 1 && (
            <TicketSelectionStep
              tiers={tiers}
              selectedTier={selectedTier}
              onSelectTier={handleSelectTier}
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={maxQuantity}
              unitPrice={unitPrice}
              totalAmount={totalAmount}
            />
          )}
          {step === 2 && <AttendeeDetailsStep />}
          {step === 3 && selectedTier && (
            <BookingSummaryStep
              eventTitle={event.title}
              tier={selectedTier}
              quantity={quantity}
              totalAmount={totalAmount}
              attendees={attendeeValues}
            />
          )}

          {optimisticBooking.status === 'confirming' && (
            <p className="bg-primary/10 text-primary mt-4 rounded-lg px-4 py-3 text-sm">
              Confirming your booking…
            </p>
          )}

          {optimisticBooking.status === 'confirmed' && (
            <p className="mt-4 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
              Booking confirmed! Redirecting to your bookings…
            </p>
          )}

          {purchaseStatus === 'failed' && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}

          <FormFooter
            step={step}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isLoading={isLoading}
            isStep1Valid={isStep1Valid}
            totalAmount={totalAmount}
            goNext={goNext}
            goBack={goBack}
            onConfirmBooking={onConfirmBooking}
            onCancel={cancel}
          />

          <p className="text-outline text-label-sm pt-gutter text-center">
            No payment charged now. You will receive an invoice by email.
          </p>
        </div>
      </FormProvider>
    </div>
  );
}
