import { FormProvider } from 'react-hook-form';
import { CalendarHeart } from 'lucide-react';

import { useCreateEventForm } from '@/hooks';
import type { ICreateEventFormProps } from '@/features';
import {
  EventBasicsStep,
  ScheduleLocationStep,
  TicketsCapacityStep,
  SpeakersHighlightsStep,
  ReviewStep,
} from '.';
import FormFooter from './FormFooter';

const STEP_DESCRIPTIONS: Record<number, string> = {
  1: 'Tell us about your event — name, description, and how attendees will find it.',
  2: 'When and where is it happening? Set your dates, times, and venue.',
  3: 'Set capacity, cover image, and ticket tiers for your attendees.',
  4: 'Pick speakers and add highlights that appear on your event details page.',
  5: 'Double-check everything looks right, then publish your event.',
};

export default function CreateEventForm({ onCancel }: ICreateEventFormProps) {
  const {
    methods,
    step,
    title,
    totalSteps,
    isFirstStep,
    isLastStep,
    isLoading,
    goBack,
    goNext,
    onPublish,
    cancel,
  } = useCreateEventForm({ onCancel });

  return (
    <div className="bg-surface-container border-outline-variant mx-auto min-w-0 max-w-3xl rounded-2xl border p-6 sm:p-10">
      <div className="py-stack-gap flex items-center justify-between gap-2">
        <p className="text-till text-label-sm font-semibold tracking-wide uppercase">
          Step {step} of {totalSteps}
        </p>
        <div className="flex items-center gap-2">
          <CalendarHeart size={22} className="text-till" />
          <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
        </div>
      </div>

      <p className="text-on-surface-variant py-stack-gap text-label-sm">
        {STEP_DESCRIPTIONS[step]}
      </p>

      <FormProvider {...methods}>
        <div className="mx-auto w-full">
          {step === 1 && <EventBasicsStep />}
          {step === 2 && <ScheduleLocationStep />}
          {step === 3 && <TicketsCapacityStep />}
          {step === 4 && <SpeakersHighlightsStep />}
          {step === 5 && <ReviewStep />}

          <FormFooter
            step={step}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isLoading={isLoading}
            goNext={goNext}
            goBack={goBack}
            onPublish={onPublish}
            onCancel={cancel}
          />
        </div>
      </FormProvider>
    </div>
  );
}
