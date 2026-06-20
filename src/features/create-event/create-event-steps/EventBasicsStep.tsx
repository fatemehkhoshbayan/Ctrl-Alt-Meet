import { useFormContext } from 'react-hook-form';
import { Input, Select, Textarea } from '@/ui';
import { useCategories } from '@/services';
import { cn } from '@/lib';
import type { TCreateEventFormValues } from '@/schemas';
import { inputClass, selectClass, textareaClass } from '../constants';

export default function EventBasicsStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TCreateEventFormValues>();
  const { data: categories = [] } = useCategories();
  const category = watch('category');

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    ...categories.map(categoryItem => ({
      value: categoryItem.name,
      label: categoryItem.name,
    })),
  ];

  return (
    <div className="gap-gutter flex flex-col">
      <fieldset className="bg-surface-container flex flex-col gap-8 rounded-lg p-10">
        <Input<TCreateEventFormValues>
          label="Event Title"
          id="title"
          type="text"
          placeholder="React Global Summit 2026"
          register={register}
          className={inputClass(!!errors.title)}
        >
          {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
        </Input>

        <Input<TCreateEventFormValues>
          label="Short Description"
          id="shortDescription"
          type="text"
          placeholder="A one-liner that appears on event cards"
          register={register}
          className={inputClass(!!errors.shortDescription)}
        >
          {errors.shortDescription && (
            <p className="mt-1 text-xs text-red-400">{errors.shortDescription.message}</p>
          )}
        </Input>

        <Textarea<TCreateEventFormValues>
          label="Full Description"
          id="description"
          placeholder="Tell attendees what makes your event special..."
          register={register}
          className={textareaClass(!!errors.description)}
        >
          {errors.description && (
            <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
          )}
        </Textarea>

        <div>
          <label
            className="text-on-surface-variant text-label-md mb-1 block font-medium"
            htmlFor="category"
          >
            Category
          </label>
          <Select
            id="category"
            className={cn(selectClass(!!errors.category), 'w-full')}
            options={categoryOptions}
            value={category}
            onChangeOption={value =>
              setValue('category', value, { shouldValidate: true, shouldTouch: true })
            }
          />
          {errors.category && (
            <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>
          )}
        </div>

        <Input<TCreateEventFormValues>
          label="Tags"
          id="tags"
          type="text"
          placeholder="React, JavaScript, Frontend"
          register={register}
          className={inputClass(!!errors.tags)}
        >
          {errors.tags && <p className="mt-1 text-xs text-red-400">{errors.tags.message}</p>}
          <p className="text-on-surface-variant mt-1 text-xs">Separate tags with commas.</p>
        </Input>
      </fieldset>
    </div>
  );
}
