import { useState } from 'react';
import { Pencil } from 'lucide-react';

import { useProfileUpdate } from '@/hooks';
import type { IUser } from '@/services';
import { UserAvatar } from '@/shared';
import { Button, IconButton } from '@/ui';
import EditUserInfoDialog from './EditUserInfoDialog';
import EditIUserAvatarDialog from './EditIUserAvatarDialog';

interface IProfileSectionProps {
  user: IUser;
  saveProfile: ReturnType<typeof useProfileUpdate>['saveProfile'];
  isSaving: boolean;
}

export default function ProfileSection({ user, saveProfile, isSaving }: IProfileSectionProps) {
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  return (
    <>
      <section className="p-6 sm:p-8">
        <div className="gap-stack-gutter flex flex-col sm:flex-row sm:items-center">
          <div className="relative self-start">
            <UserAvatar user={user} sizeClassName="h-80 w-80 text-5xl" />
            <IconButton
              type="button"
              aria-label={user.imageUrl ? 'Edit profile photo' : 'Add profile photo'}
              onClick={() => setImageDialogOpen(true)}
              className="border-on-secondary bg-secondary absolute right-6 bottom-4 rounded-full border p-2"
              icon={<Pencil size={20} className="text-on-secondary" />}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-headline-md text-headline-md text-on-surface truncate">
              {user.name}
            </h2>
            <p className="text-on-surface-variant text-body-md mt-1 truncate">{user.email}</p>
          </div>

          <Button
            type="button"
            color="secondary"
            size="sm"
            BtnText="Edit name"
            onClick={() => setNameDialogOpen(true)}
            icon={<Pencil size={16} />}
            className="self-center"
          />
        </div>
      </section>

      <EditUserInfoDialog
        open={nameDialogOpen}
        onOpenChange={setNameDialogOpen}
        user={user}
        saveProfile={saveProfile}
        isSaving={isSaving}
      />

      <EditIUserAvatarDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        user={user}
        saveProfile={saveProfile}
        isSaving={isSaving}
      />
    </>
  );
}
