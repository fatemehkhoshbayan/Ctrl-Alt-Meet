import { useState } from 'react';
import { Bell, Tag } from 'lucide-react';

import { useProfileUpdate } from '@/hooks';
import { useCategories, type IUser } from '@/services';
import ProfileSectionCard from './ProfileSectionCard';
import EditPreferencesDialog from './EditPreferencesDialog';
import { PreferenceStatusBadge, PreferenceSummaryRow } from './PreferenceSummaryRow';
import { getCategoryLabel } from './helpers';
import { PREFERENCE_SUMMARY_ITEMS } from './constants';

interface IPreferencesProps {
  user: IUser;
  saveProfile: ReturnType<typeof useProfileUpdate>['saveProfile'];
  isSaving: boolean;
}

export default function Preferences({ user, saveProfile, isSaving }: IPreferencesProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: categories = [] } = useCategories();
  const preferences = user.preferences ?? {};

  return (
    <>
      <ProfileSectionCard
        icon={<Bell size={40} className="text-secondary" />}
        title="Preferences"
        description="How we keep you in the loop and what events interest you most."
        onEdit={() => setDialogOpen(true)}
      >
        <ul className="mt-2">
          {PREFERENCE_SUMMARY_ITEMS.map(item => (
            <PreferenceSummaryRow
              key={item.key}
              label={item.label}
              description={item.description}
              value={<PreferenceStatusBadge enabled={Boolean(preferences[item.key])} />}
            />
          ))}
          <PreferenceSummaryRow
            label="Preferred category"
            description="Events we think you'll enjoy most"
            value={
              <span className="bg-surface-container-high text-on-surface text-label-sm inline-flex max-w-[10rem] items-center gap-1.5 truncate rounded-full px-3 py-1 font-medium sm:max-w-none">
                <Tag size={14} className="text-secondary shrink-0" />
                {getCategoryLabel(preferences.preferredCategory, categories)}
              </span>
            }
          />
        </ul>
      </ProfileSectionCard>

      <EditPreferencesDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={user}
        saveProfile={saveProfile}
        isSaving={isSaving}
        categories={categories}
      />
    </>
  );
}
