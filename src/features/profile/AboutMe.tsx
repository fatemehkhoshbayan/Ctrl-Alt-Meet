import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User } from 'lucide-react';

import { useProfileUpdate } from '@/hooks';
import type { IUser } from '@/services';
import { profileAboutSchema, type TProfileAboutValues } from '@/schemas';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
} from '@/ui';
import ProfileSectionCard from './ProfileSectionCard';
import { textareaClass } from './styles';

interface IAboutMeProps {
  user: IUser;
  saveProfile: ReturnType<typeof useProfileUpdate>['saveProfile'];
  isSaving: boolean;
}

export default function AboutMe({ user, saveProfile, isSaving }: IAboutMeProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const methods = useForm<TProfileAboutValues>({
    resolver: zodResolver(profileAboutSchema),
    defaultValues: { about: user.about ?? '' },
  });

  const { register, handleSubmit, reset, formState } = methods;

  useEffect(() => {
    if (dialogOpen) {
      reset({ about: user.about ?? '' });
    }
  }, [dialogOpen, user.about, reset]);

  const onSubmit = handleSubmit(async values => {
    const updated = await saveProfile({ about: values.about ?? '' }, 'About me updated');
    if (updated) setDialogOpen(false);
  });

  const openDialog = () => setDialogOpen(true);

  return (
    <>
      <ProfileSectionCard
        title="About me"
        description="Optional — add this anytime after creating your account."
        onEdit={openDialog}
        editLabel={user.about ? 'Edit' : 'Add'}
        icon={<User size={40} className="text-secondary" />}
      >
        {user.about ? (
          <p className="text-on-surface text-body-md leading-relaxed whitespace-pre-wrap">
            {user.about}
          </p>
        ) : (
          <p className="text-on-surface-variant text-body-md italic">
            You haven&apos;t added a bio yet. Tell others a little about yourself.
          </p>
        )}
      </ProfileSectionCard>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-outline-variant/40 bg-surface-container-low text-primary sm:rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-headline-lg-mobile md:text-headline-lg">
              {user.about ? 'Edit about me' : 'Add about me'}
            </DialogTitle>
            <DialogDescription>Share a short bio that appears on your profile.</DialogDescription>
          </DialogHeader>

          <FormProvider {...methods}>
            <div className="flex flex-col">
              <Textarea<TProfileAboutValues>
                label="Bio"
                id="about"
                placeholder="Tell others about yourself..."
                register={register}
                className={textareaClass(!!formState.errors.about)}
              >
                {formState.errors.about && (
                  <p className="mt-1 text-xs text-red-400">{formState.errors.about.message}</p>
                )}
              </Textarea>

              <DialogFooter className="items-start">
                <Button
                  type="button"
                  disabled={isSaving}
                  BtnText={isSaving ? 'Saving…' : 'Save'}
                  icon={isSaving ? <Loader2 size={18} className="animate-spin" /> : undefined}
                  onClick={onSubmit}
                />
                <Button
                  type="button"
                  color="secondary"
                  BtnText="Cancel"
                  onClick={() => setDialogOpen(false)}
                  disabled={isSaving}
                />
              </DialogFooter>
            </div>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
