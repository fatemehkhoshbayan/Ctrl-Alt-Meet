import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/ui';
import type { TAttendeesFormValues } from '@/features';

function inputClass(hasError: boolean) {
  return [
    'bg-surface-container-high text-on-surface placeholder:text-on-surface-variant w-full rounded-lg px-4 py-3 transition-all outline-none',
    'focus:border-primary focus:ring-primary border focus:ring-1',
    hasError ? 'border-red-400' : 'border-outline-variant',
  ].join(' ');
}

export default function AttendeeDetailsStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TAttendeesFormValues>();
  const { fields } = useFieldArray({ control, name: 'attendees' });

  return (
    <div className="gap-gutter flex flex-col overflow-y-auto">
      {fields.map((field, index) => {
        const fieldErrors = errors.attendees?.[index];
        return (
          <fieldset
            key={field.id}
            className="bg-surface-container flex flex-col gap-10 rounded-lg p-10"
          >
            <Input<TAttendeesFormValues>
              label="Full Name"
              id={`attendees.${index}.name`}
              type="text"
              placeholder="Jane Doe"
              register={register}
              className={inputClass(!!fieldErrors?.name)}
            >
              {fieldErrors?.name && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name.message}</p>
              )}
            </Input>

            <Input<TAttendeesFormValues>
              label="Email Address"
              id={`attendees.${index}.email`}
              type="email"
              placeholder="jane@example.com"
              register={register}
              className={inputClass(!!fieldErrors?.email)}
            >
              {fieldErrors?.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email.message}</p>
              )}
            </Input>

            <Input<TAttendeesFormValues>
              label="Phone Number"
              id={`attendees.${index}.phone`}
              type="tel"
              placeholder="+1 555 0100"
              register={register}
              className={inputClass(!!fieldErrors?.phone)}
            >
              {fieldErrors?.phone && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.phone.message}</p>
              )}
            </Input>
          </fieldset>
        );
      })}
    </div>
  );
}
