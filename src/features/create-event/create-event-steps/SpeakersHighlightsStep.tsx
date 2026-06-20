import { useFieldArray, useFormContext } from 'react-hook-form';
import { Minus, Plus } from 'lucide-react';
import { Button, IconButton, Input, Select, Textarea } from '@/ui';
import { cn } from '@/lib';
import { useSpeakers } from '@/services';
import type { TCreateEventFormValues } from '@/schemas';
import {
  HIGHLIGHT_ACCENT_OPTIONS,
  HIGHLIGHT_ICON_OPTIONS,
  inputClass,
  selectClass,
  textareaClass,
} from '../constants';

export default function SpeakersHighlightsStep() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TCreateEventFormValues>();

  const { data: speakers = [] } = useSpeakers();
  const selectedSpeakers = watch('speakers') ?? [];

  const { fields, append, remove } = useFieldArray({ control, name: 'highlights' });

  function toggleSpeaker(speakerId: string) {
    const next = selectedSpeakers.includes(speakerId)
      ? selectedSpeakers.filter(id => id !== speakerId)
      : [...selectedSpeakers, speakerId];

    setValue('speakers', next, { shouldDirty: true, shouldTouch: true });
  }

  return (
    <div className="gap-gutter flex flex-col">
      <fieldset className="bg-surface-container flex flex-col gap-6 rounded-lg p-10">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Speakers</h3>
          <p className="text-on-surface-variant text-label-sm">
            Select speakers from the community directory. Optional — you can skip this and add
            speakers later.
          </p>
        </div>

        {speakers.length > 0 ? (
          <div className="gap-stack-gap grid sm:grid-cols-2">
            {speakers.map(speaker => {
              const isSelected = selectedSpeakers.includes(speaker.id);

              return (
                <label
                  key={speaker.id}
                  className={cn(
                    'border-outline-variant hover:border-till flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors',
                    isSelected && 'border-till bg-till/10',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSpeaker(speaker.id)}
                    className="border-outline-variant text-till focus:ring-till/20 h-5 w-5 rounded"
                  />
                  <img
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-on-surface font-medium">{speaker.name}</p>
                    <p className="text-on-surface-variant text-label-sm truncate">
                      {speaker.title}, {speaker.company}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="text-on-surface-variant text-label-sm">No speakers available yet.</p>
        )}
      </fieldset>

      <div className="gap-stack-gap flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary">Event Highlights</h3>
            <p className="text-on-surface-variant text-label-sm">
              Showcase what makes your event special on the details page.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            color="till"
            variant="outlined"
            BtnText="Add Highlight"
            icon={<Plus size={16} />}
            onClick={() =>
              append({
                title: '',
                description: '',
                icon: 'sparkles',
                image: '',
                featured: false,
                accent: 'default',
              })
            }
          />
        </div>

        {fields.length === 0 && (
          <p className="bg-surface-container text-on-surface-variant rounded-lg p-4 text-sm">
            No highlights yet. Add one to feature key moments on your event page.
          </p>
        )}

        {fields.map((field, index) => {
          const highlightErrors = errors.highlights?.[index];
          const icon = watch(`highlights.${index}.icon`);
          const accent = watch(`highlights.${index}.accent`);

          return (
            <fieldset
              key={field.id}
              className="bg-surface-container flex flex-col gap-6 rounded-lg p-8"
            >
              <div className="flex items-center justify-between">
                <legend className="font-headline-sm text-headline-sm text-on-surface">
                  Highlight {index + 1}
                </legend>
                <IconButton
                  type="button"
                  aria-label={`Remove highlight ${index + 1}`}
                  icon={<Minus size={16} />}
                  className="border-outline-variant text-on-surface-variant hover:border-red-400 hover:text-red-400 flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
                  onClick={() => remove(index)}
                />
              </div>

              <Input<TCreateEventFormValues>
                label="Title"
                id={`highlights.${index}.title`}
                type="text"
                placeholder="Networking Mixer"
                register={register}
                className={inputClass(!!highlightErrors?.title)}
              >
                {highlightErrors?.title && (
                  <p className="mt-1 text-xs text-red-400">{highlightErrors.title.message}</p>
                )}
              </Input>

              <Textarea<TCreateEventFormValues>
                label="Description"
                id={`highlights.${index}.description`}
                placeholder="Meet builders, hiring teams, and mentors."
                register={register}
                className={textareaClass(!!highlightErrors?.description)}
              >
                {highlightErrors?.description && (
                  <p className="mt-1 text-xs text-red-400">
                    {highlightErrors.description.message}
                  </p>
                )}
              </Textarea>

              <div>
                <label
                  className="text-on-surface-variant text-label-md mb-1 block font-medium"
                  htmlFor={`highlights.${index}.icon`}
                >
                  Icon
                </label>
                <Select
                  id={`highlights.${index}.icon`}
                  className={cn(selectClass(!!highlightErrors?.icon), 'w-full')}
                  options={HIGHLIGHT_ICON_OPTIONS}
                  value={icon}
                  onChangeOption={value =>
                    setValue(`highlights.${index}.icon`, value, {
                      shouldValidate: true,
                      shouldTouch: true,
                    })
                  }
                />
                {highlightErrors?.icon && (
                  <p className="mt-1 text-xs text-red-400">{highlightErrors.icon.message}</p>
                )}
              </div>

              <Input<TCreateEventFormValues>
                label="Image URL (optional)"
                id={`highlights.${index}.image`}
                type="url"
                placeholder="https://images.unsplash.com/..."
                register={register}
                className={inputClass(!!highlightErrors?.image)}
              >
                <p className="text-on-surface-variant mt-1 text-xs">
                  Used for featured highlights with a large image card.
                </p>
              </Input>

              <div>
                <label
                  className="text-on-surface-variant text-label-md mb-1 block font-medium"
                  htmlFor={`highlights.${index}.accent`}
                >
                  Accent Style
                </label>
                <Select
                  id={`highlights.${index}.accent`}
                  className={cn('w-full', selectClass(false))}
                  options={HIGHLIGHT_ACCENT_OPTIONS}
                  value={accent ?? 'default'}
                  onChangeOption={value =>
                    setValue(`highlights.${index}.accent`, value as 'primary' | 'secondary' | 'default', {
                      shouldTouch: true,
                    })
                  }
                />
              </div>

              <label className="text-on-surface-variant flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  {...register(`highlights.${index}.featured`)}
                  className="border-outline-variant text-till focus:ring-till/20 h-5 w-5 rounded"
                />
                <span className="text-label-md">Featured highlight (large image card)</span>
              </label>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
