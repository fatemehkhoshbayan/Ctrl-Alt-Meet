import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/hooks';
import { buildCreateEventPayload, useCreateEvent } from '@/services';
import {
  createEventSchema,
  CREATE_EVENT_STEP_FIELDS,
  type TCreateEventFormValues,
} from '@/schemas';
import type { TCreateEventStep } from '@/features';

const TOTAL_STEPS = 5;

const STEP_TITLES: Record<TCreateEventStep, string> = {
  1: 'Event Details',
  2: 'Schedule & Location',
  3: 'Tickets & Capacity',
  4: 'Speakers & Highlights',
  5: 'Review & Publish',
};

const DEFAULT_VALUES: TCreateEventFormValues = {
  title: '',
  shortDescription: '',
  description: '',
  category: '',
  tags: '',
  date: '',
  endDate: '',
  time: '09:00',
  endTime: '18:00',
  timezone: 'PST',
  venue: '',
  city: '',
  country: '',
  maxAttendees: 100,
  imageUrl: '',
  venueImage: '',
  ticketTiers: [
    {
      name: 'General Admission',
      price: 0,
      description: '',
      perks: '',
      total: 100,
    },
  ],
  speakers: [],
  highlights: [],
};

export function useCreateEventForm({ onCancel }: { onCancel: () => void }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: createEvent, isPending } = useCreateEvent();

  const [step, setStep] = useState<TCreateEventStep>(1);
  const goToNextStep = () => setStep(s => (s < TOTAL_STEPS ? ((s + 1) as TCreateEventStep) : s));
  const goToPreviousStep = () => setStep(s => (s > 1 ? ((s - 1) as TCreateEventStep) : s));

  const isFirstStep = step === 1;
  const isLastStep = step === TOTAL_STEPS;
  const title = STEP_TITLES[step];

  const methods = useForm<TCreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { handleSubmit, trigger, getValues } = methods;

  const goBack = () => {
    if (!isFirstStep) goToPreviousStep();
  };

  const goNext = async () => {
    if (isLastStep) return;

    const fields = CREATE_EVENT_STEP_FIELDS[step];
    const valid = await trigger([...fields]);
    if (!valid) return;

    goToNextStep();
  };

  const onPublish = handleSubmit(values => {
    if (!user) {
      navigate('/login', { state: { from: '/create-event' } });
      return;
    }

    const payload = buildCreateEventPayload(values, user);

    createEvent(payload, {
      onSuccess: event => {
        toast.success('Event published!', {
          description: `${event.title} is now live on Ctrl Alt Meet.`,
          duration: 8000,
        });
        navigate(`/events/${event.id}`);
      },
    });
  });

  return {
    methods,
    values: getValues(),
    step,
    title,
    totalSteps: TOTAL_STEPS,
    isFirstStep,
    isLastStep,
    isLoading: isPending,
    goBack,
    goNext,
    onPublish,
    cancel: onCancel,
  };
}
