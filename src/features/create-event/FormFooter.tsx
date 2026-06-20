import { Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/ui';

interface IFormFooterProps {
  step: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  goNext: () => void;
  goBack: () => void;
  onPublish: () => void;
  onCancel: () => void;
}

const STEP_BUTTON_LABELS: Record<number, string> = {
  1: 'Continue to Schedule',
  2: 'Continue to Tickets',
  3: 'Continue to Speakers',
  4: 'Review Event',
};

export default function FormFooter({
  step,
  isFirstStep,
  isLastStep,
  isLoading,
  goNext,
  goBack,
  onPublish,
  onCancel,
}: IFormFooterProps) {
  const primaryLabel = isLastStep ? 'Publish Event' : STEP_BUTTON_LABELS[step];
  const primaryAction = isLastStep ? onPublish : goNext;

  return (
    <div className="pt-gutter gap-stack-gap flex flex-col sm:flex-row">
      <Button
        onClick={primaryAction}
        type="button"
        disabled={isLoading}
        color="till"
        className="flex w-full items-center justify-center gap-2 font-bold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Publishing…
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
        aria-label={isFirstStep ? 'Cancel event creation' : 'Go back to previous step'}
        size="md"
        className="w-full sm:w-auto"
        color="secondary"
      >
        {isFirstStep ? 'Cancel' : 'Back'}
      </Button>
    </div>
  );
}
