import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { profileNameSchema, type TProfileNameValues } from '@/schemas';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/ui';
import type { useProfileUpdate } from '@/hooks';
import type { IUser } from '@/services';
import { inputClass } from './styles';

interface IEditUserInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
  saveProfile: ReturnType<typeof useProfileUpdate>['saveProfile'];
  isSaving: boolean;
}

export default function EditUserInfoDialog({
  open,
  onOpenChange,
  user,
  isSaving,
  saveProfile,
}: IEditUserInfoDialogProps) {
  const methods = useForm<TProfileNameValues>({
    resolver: zodResolver(profileNameSchema),
    defaultValues: { name: user.name },
  });

  const {
    register: registerName,
    handleSubmit: handleNameSubmit,
    reset: resetName,
    formState: nameFormState,
  } = methods;

  useEffect(() => {
    if (open) {
      resetName({ name: user.name });
    }
  }, [open, user.name, resetName]);

  const onSubmit = handleNameSubmit(async values => {
    const updated = await saveProfile({ name: values.name.trim() }, 'Name updated');
    if (updated) onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-outline-variant/40 bg-surface-container-low text-primary sm:rounded-[2rem]">
        <DialogHeader>
          <DialogTitle>Edit name</DialogTitle>
          <DialogDescription>Update how your name appears across Ctrl Alt Meet.</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <div className="gap-gutter flex flex-col">
            <Input<TProfileNameValues>
              label="Full Name"
              id="name"
              type="text"
              placeholder="Jane Doe"
              register={registerName}
              className={inputClass(!!nameFormState.errors.name)}
            >
              {nameFormState.errors.name && (
                <p className="mt-1 text-xs text-red-400">{nameFormState.errors.name.message}</p>
              )}
            </Input>
            <DialogFooter>
              <Button
                type="button"
                color="secondary"
                BtnText="Cancel"
                onClick={() => onOpenChange(false)}
              />
              <Button
                type="button"
                disabled={isSaving}
                BtnText={isSaving ? 'Saving…' : 'Save'}
                icon={isSaving ? <Loader2 size={18} className="animate-spin" /> : undefined}
                onClick={onSubmit}
              />
            </DialogFooter>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
