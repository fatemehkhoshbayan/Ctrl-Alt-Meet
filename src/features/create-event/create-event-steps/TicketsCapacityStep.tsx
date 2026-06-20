import { useFieldArray, useFormContext } from 'react-hook-form';
import { Minus, Plus } from 'lucide-react';
import { Button, IconButton, Input, Textarea } from '@/ui';
import type { TCreateEventFormValues } from '@/schemas';
import { inputClass, textareaClass } from '../constants';

export default function TicketsCapacityStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TCreateEventFormValues>();

  const { fields, append, remove } = useFieldArray({ control, name: 'ticketTiers' });

  return (
    <div className="gap-gutter flex flex-col">
      <fieldset className="bg-surface-container flex flex-col gap-8 rounded-lg p-10">
        <div>
          <label
            className="text-on-surface-variant text-label-md mb-1 block font-medium"
            htmlFor="maxAttendees"
          >
            Maximum Attendees
          </label>
          <input
            id="maxAttendees"
            type="number"
            placeholder="3000"
            {...register('maxAttendees', { valueAsNumber: true })}
            className={inputClass(!!errors.maxAttendees)}
          />
          {errors.maxAttendees && (
            <p className="mt-1 text-xs text-red-400">{errors.maxAttendees.message}</p>
          )}
        </div>

        <Input<TCreateEventFormValues>
          label="Cover Image URL (optional)"
          id="imageUrl"
          type="url"
          placeholder="https://images.unsplash.com/..."
          register={register}
          className={inputClass(!!errors.imageUrl)}
        >
          {errors.imageUrl && (
            <p className="mt-1 text-xs text-red-400">{errors.imageUrl.message}</p>
          )}
          <p className="text-on-surface-variant mt-1 text-xs">
            Leave blank to use a default cover image.
          </p>
        </Input>

        <Input<TCreateEventFormValues>
          label="Venue Image URL (optional)"
          id="venueImage"
          type="url"
          placeholder="https://images.unsplash.com/..."
          register={register}
          className={inputClass(!!errors.venueImage)}
        >
          {errors.venueImage && (
            <p className="mt-1 text-xs text-red-400">{errors.venueImage.message}</p>
          )}
        </Input>
      </fieldset>

      <div className="gap-stack-gap flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-primary">Ticket Tiers</h3>
          <Button
            type="button"
            size="sm"
            color="till"
            variant="outlined"
            BtnText="Add Tier"
            icon={<Plus size={16} />}
            onClick={() =>
              append({
                name: '',
                price: 0,
                description: '',
                perks: '',
                total: 50,
              })
            }
          />
        </div>

        {errors.ticketTiers?.root && (
          <p className="text-xs text-red-400">{errors.ticketTiers.root.message}</p>
        )}

        {fields.map((field, index) => {
          const tierErrors = errors.ticketTiers?.[index];

          return (
            <fieldset
              key={field.id}
              className="bg-surface-container flex flex-col gap-6 rounded-lg p-8"
            >
              <div className="flex items-center justify-between">
                <legend className="font-headline-sm text-headline-sm text-on-surface">
                  Tier {index + 1}
                </legend>
                {fields.length > 1 && (
                  <IconButton
                    type="button"
                    aria-label={`Remove tier ${index + 1}`}
                    icon={<Minus size={16} />}
                    className="border-outline-variant text-on-surface-variant hover:border-red-400 hover:text-red-400 flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
                    onClick={() => remove(index)}
                  />
                )}
              </div>

              <div className="gap-stack-gap grid sm:grid-cols-2">
                <Input<TCreateEventFormValues>
                  label="Tier Name"
                  id={`ticketTiers.${index}.name`}
                  type="text"
                  placeholder="General Admission"
                  register={register}
                  className={inputClass(!!tierErrors?.name)}
                >
                  {tierErrors?.name && (
                    <p className="mt-1 text-xs text-red-400">{tierErrors.name.message}</p>
                  )}
                </Input>

                <div>
                  <label
                    className="text-on-surface-variant text-label-md mb-1 block font-medium"
                    htmlFor={`ticketTiers.${index}.price`}
                  >
                    Price ($)
                  </label>
                  <input
                    id={`ticketTiers.${index}.price`}
                    type="number"
                    placeholder="99"
                    {...register(`ticketTiers.${index}.price`, { valueAsNumber: true })}
                    className={inputClass(!!tierErrors?.price)}
                  />
                  {tierErrors?.price && (
                    <p className="mt-1 text-xs text-red-400">{tierErrors.price.message}</p>
                  )}
                </div>
              </div>

              <Textarea<TCreateEventFormValues>
                label="Description"
                id={`ticketTiers.${index}.description`}
                placeholder="What's included in this pass?"
                register={register}
                className={textareaClass(!!tierErrors?.description)}
              >
                {tierErrors?.description && (
                  <p className="mt-1 text-xs text-red-400">{tierErrors.description.message}</p>
                )}
              </Textarea>

              <Input<TCreateEventFormValues>
                label="Perks"
                id={`ticketTiers.${index}.perks`}
                type="text"
                placeholder="All keynotes, Lunch, Swag bag"
                register={register}
                className={inputClass(!!tierErrors?.perks)}
              >
                {tierErrors?.perks && (
                  <p className="mt-1 text-xs text-red-400">{tierErrors.perks.message}</p>
                )}
                <p className="text-on-surface-variant mt-1 text-xs">Separate perks with commas.</p>
              </Input>

              <div>
                <label
                  className="text-on-surface-variant text-label-md mb-1 block font-medium"
                  htmlFor={`ticketTiers.${index}.total`}
                >
                  Total Capacity
                </label>
                <input
                  id={`ticketTiers.${index}.total`}
                  type="number"
                  placeholder="250"
                  {...register(`ticketTiers.${index}.total`, { valueAsNumber: true })}
                  className={inputClass(!!tierErrors?.total)}
                />
                {tierErrors?.total && (
                  <p className="mt-1 text-xs text-red-400">{tierErrors.total.message}</p>
                )}
              </div>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
