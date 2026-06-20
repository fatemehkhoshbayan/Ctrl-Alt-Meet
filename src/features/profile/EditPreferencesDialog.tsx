import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import type { useProfileUpdate } from '@/hooks';
import type { IUser, TCategory } from '@/services';
import { profilePreferencesSchema, type TProfilePreferencesValues } from '@/schemas';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
} from '@/ui';
import { selectClass } from './styles';
import { buildPreferenceFormValues } from './helpers';
import { PREFERENCE_TOGGLE_ITEMS } from './constants';

interface IEditPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
  saveProfile: ReturnType<typeof useProfileUpdate>['saveProfile'];
  isSaving: boolean;
  categories: TCategory[];
}

export default function EditPreferencesDialog({
  open,
  onOpenChange,
  user,
  saveProfile,
  isSaving,
  categories,
}: IEditPreferencesDialogProps) {
  const methods = useForm<TProfilePreferencesValues>({
    resolver: zodResolver(profilePreferencesSchema),
    defaultValues: { preferences: buildPreferenceFormValues(user.preferences) },
  });

  const { register, control, handleSubmit, reset } = methods;

  useEffect(() => {
    if (open) {
      reset({ preferences: buildPreferenceFormValues(user.preferences) });
    }
  }, [open, user.preferences, reset]);

  const onSubmit = handleSubmit(async values => {
    const updated = await saveProfile({ preferences: values.preferences }, 'Preferences updated');
    if (updated) onOpenChange(false);
  });

  const categoryOptions = [
    { value: '', label: 'No preference' },
    ...categories.map(category => ({ value: category.id, label: category.name })),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-outline-variant/40 bg-surface-container-low text-primary sm:rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-headline-lg-mobile md:text-headline-lg">
            Edit preferences
          </DialogTitle>
          <DialogDescription>
            Choose your notification settings and favorite event category.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <div className="flex flex-col">
            <fieldset className="flex flex-col">
              <legend className="text-secondary text-label-md py-3 font-semibold tracking-wide uppercase">
                Notifications
              </legend>
              {PREFERENCE_TOGGLE_ITEMS.map(item => (
                <label
                  key={item.id}
                  className="hover:bg-surface-container-high flex cursor-pointer items-start gap-3 p-4 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="border-outline-variant text-primary focus:ring-primary mt-1 h-4 w-4 rounded"
                    {...register(`preferences.${item.id}`)}
                  />
                  <div className="min-w-0">
                    <p className="text-on-surface text-body-md block font-medium">{item.title}</p>
                    <p className="text-on-surface-variant text-label-sm mt-1 block">
                      {item.description}
                    </p>
                  </div>
                </label>
              ))}
            </fieldset>

            <fieldset className="flex flex-col gap-6">
              <legend className="text-secondary text-label-md pb-3 font-semibold tracking-wide uppercase">
                Interests
              </legend>
              <label
                htmlFor="preferredCategory"
                className="text-on-surface-variant text-body-md block font-medium"
              >
                Preferred event category
              </label>
              <Controller
                control={control}
                name="preferences.preferredCategory"
                render={({ field }) => (
                  <Select
                    id="preferredCategory"
                    label="Preferred event category"
                    options={categoryOptions}
                    value={field.value ?? ''}
                    onChangeOption={field.onChange}
                    className={selectClass(false)}
                  />
                )}
              />
              <p className="text-on-surface-variant text-label-sm">
                We&apos;ll use this to highlight relevant events for you.
              </p>
            </fieldset>

            <DialogFooter className="items-start">
              <Button
                type="button"
                disabled={isSaving}
                BtnText={isSaving ? 'Saving…' : 'Save preferences'}
                icon={isSaving ? <Loader2 size={18} className="animate-spin" /> : undefined}
                onClick={onSubmit}
              />
              <Button
                type="button"
                color="secondary"
                BtnText="Cancel"
                onClick={() => onOpenChange(false)}
                disabled={isSaving}
              />
            </DialogFooter>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
