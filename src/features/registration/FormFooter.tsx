import { Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/ui';

interface IFormFooterProps {
  step: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  isStep1Valid: boolean;
  totalAmount: number;
  goNext: () => void;
  goBack: () => void;
  onConfirmBooking: () => void;
  onCancel: () => void;
}

const STEP_BUTTON_LABELS: Record<number, string> = {
  1: 'Continue to Attendee Details',
  2: 'Review Booking',
};

export default function FormFooter({
  step,
  isFirstStep,
  isLastStep,
  isLoading,
  isStep1Valid,
  totalAmount,
  goNext,
  goBack,
  onConfirmBooking,
  onCancel,
}: IFormFooterProps) {
  const primaryLabel = isLastStep
    ? `Confirm & Book — $${totalAmount.toLocaleString()}`
    : STEP_BUTTON_LABELS[step];

  const primaryAction = isLastStep ? onConfirmBooking : goNext;
  const isPrimaryDisabled = isLoading || (step === 1 && !isStep1Valid);

  return (
    <>
      <div className="pt-gutter gap-stack-gap flex flex-col sm:flex-row">
        <Button
          onClick={primaryAction}
          type="button"
          disabled={isPrimaryDisabled}
          className="bg-primary text-on-primary flex w-full items-center justify-center gap-2 rounded-full font-bold transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing…
            </>
          ) : (
            <>
              {primaryLabel}
              {!isLastStep && <ChevronRight size={18} />}
            </>
          )}
        </Button>

        <Button
          onClick={isFirstStep ? onCancel : goBack}
          aria-label={isFirstStep ? 'Cancel registration' : 'Go back to previous step'}
          size="md"
          className="w-full sm:w-auto"
          color="secondary"
        >
          {isFirstStep ? 'Cancel' : 'Back'}
        </Button>
      </div>
    </>
  );
}
