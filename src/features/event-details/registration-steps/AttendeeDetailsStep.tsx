import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TAttendeesFormValues } from '../types';

interface IAttendeeDetailsStepProps {
  fields: { id: string }[];
  register: UseFormRegister<TAttendeesFormValues>;
  errors?: FieldErrors<TAttendeesFormValues>['attendees'];
}

function inputClass(hasError: boolean) {
  return [
    'bg-surface-container-high text-on-surface placeholder:text-on-surface-variant w-full rounded-lg px-4 py-3 transition-all outline-none',
    'focus:border-primary focus:ring-primary border focus:ring-1',
    hasError ? 'border-red-400' : 'border-outline-variant',
  ].join(' ');
}

export default function AttendeeDetailsStep({
  fields,
  register,
  errors,
}: IAttendeeDetailsStepProps) {
  return (
    <div className="gap-gutter flex max-h-[50vh] flex-col overflow-y-auto pr-1">
      {fields.map((field, index) => {
        const fieldErrors = errors?.[index];
        return (
          <fieldset
            key={field.id}
            className="bg-surface-container gap-stack-gap flex flex-col rounded-lg p-4"
          >
            <legend className="text-label-md mb-1 font-semibold text-white">
              Ticket {index + 1}
            </legend>

            <div>
              <label
                className="text-label-md mb-1 block font-medium text-white"
                htmlFor={`attendees.${index}.name`}
              >
                Full Name
              </label>
              <input
                id={`attendees.${index}.name`}
                type="text"
                placeholder="Jane Doe"
                {...register(`attendees.${index}.name`)}
                className={inputClass(!!fieldErrors?.name)}
              />
              {fieldErrors?.name && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name.message}</p>
              )}
            </div>

            <div>
              <label
                className="text-label-md mb-1 block font-medium text-white"
                htmlFor={`attendees.${index}.email`}
              >
                Email Address
              </label>
              <input
                id={`attendees.${index}.email`}
                type="email"
                placeholder="jane@example.com"
                {...register(`attendees.${index}.email`)}
                className={inputClass(!!fieldErrors?.email)}
              />
              {fieldErrors?.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email.message}</p>
              )}
            </div>

            <div>
              <label
                className="text-label-md mb-1 block font-medium text-white"
                htmlFor={`attendees.${index}.phone`}
              >
                Phone Number
              </label>
              <input
                id={`attendees.${index}.phone`}
                type="tel"
                placeholder="+1 555 0100"
                {...register(`attendees.${index}.phone`)}
                className={inputClass(!!fieldErrors?.phone)}
              />
              {fieldErrors?.phone && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.phone.message}</p>
              )}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
