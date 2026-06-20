import { useFormContext } from 'react-hook-form';
import { Input, Select } from '@/ui';
import { cn } from '@/lib';
import type { TCreateEventFormValues } from '@/schemas';
import { inputClass, selectClass, TIMEZONE_OPTIONS } from '../constants';

export default function ScheduleLocationStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TCreateEventFormValues>();
  const timezone = watch('timezone');

  return (
    <div className="gap-gutter flex flex-col">
      <fieldset className="bg-surface-container flex flex-col gap-8 rounded-lg p-10">
        <div className="gap-stack-gap grid sm:grid-cols-2">
          <Input<TCreateEventFormValues>
            label="Start Date"
            id="date"
            type="date"
            placeholder=""
            register={register}
            className={inputClass(!!errors.date)}
          >
            {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>}
          </Input>

          <Input<TCreateEventFormValues>
            label="End Date"
            id="endDate"
            type="date"
            placeholder=""
            register={register}
            className={inputClass(!!errors.endDate)}
          >
            {errors.endDate && <p className="mt-1 text-xs text-red-400">{errors.endDate.message}</p>}
          </Input>
        </div>

        <div className="gap-stack-gap grid sm:grid-cols-2">
          <Input<TCreateEventFormValues>
            label="Start Time"
            id="time"
            type="time"
            placeholder=""
            register={register}
            className={inputClass(!!errors.time)}
          >
            {errors.time && <p className="mt-1 text-xs text-red-400">{errors.time.message}</p>}
          </Input>

          <Input<TCreateEventFormValues>
            label="End Time"
            id="endTime"
            type="time"
            placeholder=""
            register={register}
            className={inputClass(!!errors.endTime)}
          >
            {errors.endTime && <p className="mt-1 text-xs text-red-400">{errors.endTime.message}</p>}
          </Input>
        </div>

        <div>
          <label
            className="text-on-surface-variant text-label-md mb-1 block font-medium"
            htmlFor="timezone"
          >
            Timezone
          </label>
          <Select
            id="timezone"
            className={cn(selectClass(!!errors.timezone), 'w-full')}
            options={TIMEZONE_OPTIONS}
            value={timezone}
            onChangeOption={value =>
              setValue('timezone', value, { shouldValidate: true, shouldTouch: true })
            }
          />
          {errors.timezone && (
            <p className="mt-1 text-xs text-red-400">{errors.timezone.message}</p>
          )}
        </div>
      </fieldset>

      <fieldset className="bg-surface-container flex flex-col gap-8 rounded-lg p-10">
        <Input<TCreateEventFormValues>
          label="Venue"
          id="venue"
          type="text"
          placeholder="Moscone Center"
          register={register}
          className={inputClass(!!errors.venue)}
        >
          {errors.venue && <p className="mt-1 text-xs text-red-400">{errors.venue.message}</p>}
        </Input>

        <div className="gap-stack-gap grid sm:grid-cols-2">
          <Input<TCreateEventFormValues>
            label="City"
            id="city"
            type="text"
            placeholder="San Francisco, CA"
            register={register}
            className={inputClass(!!errors.city)}
          >
            {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city.message}</p>}
          </Input>

          <Input<TCreateEventFormValues>
            label="Country"
            id="country"
            type="text"
            placeholder="United States"
            register={register}
            className={inputClass(!!errors.country)}
          >
            {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country.message}</p>}
          </Input>
        </div>
      </fieldset>
    </div>
  );
}
