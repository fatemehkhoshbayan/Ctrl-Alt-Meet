import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

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
import { inputClass } from './styles';
import { profileImageSchema, type TProfileImageValues } from '@/schemas';
import type { IUser } from '@/services';
import type { useProfileUpdate } from '@/hooks';
import { UserAvatar } from '@/shared';
import { useEffect } from 'react';

interface IEditIUserAvatarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
  saveProfile: ReturnType<typeof useProfileUpdate>['saveProfile'];
  isSaving: boolean;
}

export default function EditIUserAvatarDialog({
  open,
  onOpenChange,
  user,
  isSaving,
  saveProfile,
}: IEditIUserAvatarDialogProps) {
  const imageMethods = useForm<TProfileImageValues>({
    resolver: zodResolver(profileImageSchema),
    defaultValues: { imageUrl: user.imageUrl ?? '' },
  });

  const {
    register: registerImage,
    handleSubmit: handleImageSubmit,
    reset: resetImage,
    control,
    formState: imageFormState,
  } = imageMethods;

  const imageUrl = useWatch({ control, name: 'imageUrl' });

  useEffect(() => {
    if (open) {
      resetImage({ imageUrl: user.imageUrl ?? '' });
    }
  }, [open, user.imageUrl, resetImage]);

  const onImageSubmit = handleImageSubmit(async values => {
    const updated = await saveProfile(
      { imageUrl: values.imageUrl?.trim() ?? '' },
      user.imageUrl ? 'Profile photo updated' : 'Profile photo added',
    );
    if (updated) onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-outline-variant/40 bg-surface-container-low text-primary sm:rounded-[2rem]">
        <DialogHeader>
          <DialogTitle>{user.imageUrl ? 'Edit profile photo' : 'Add profile photo'}</DialogTitle>
          <DialogDescription>
            Paste an image URL. Leave blank to use your initials instead.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...imageMethods}>
          <div className="gap-gutter flex flex-col">
            <div className="flex justify-center">
              <UserAvatar
                user={{
                  ...user,
                  imageUrl: imageUrl?.trim() || undefined,
                }}
                sizeClassName="h-40 w-40 text-5xl"
              />
            </div>
            <Input<TProfileImageValues>
              label="Profile Image URL"
              id="imageUrl"
              type="url"
              placeholder="https://images.unsplash.com/..."
              register={registerImage}
              className={inputClass(!!imageFormState.errors.imageUrl)}
            >
              {imageFormState.errors.imageUrl && (
                <p className="mt-1 text-xs text-red-400">
                  {imageFormState.errors.imageUrl.message}
                </p>
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
                onClick={onImageSubmit}
              />
            </DialogFooter>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
