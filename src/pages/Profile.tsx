import { useLoaderData } from 'react-router-dom';
import { AboutMe, Preferences, ProfileHeroSection, ProfileLogout, ProfileSection } from '@/features';
import { useProfileUpdate } from '@/hooks';
import type { ProfileLoaderData } from '@/services';

export default function Profile() {
  const { user: loaderUser } = useLoaderData() as ProfileLoaderData;
  const { user, saveProfile, isSaving } = useProfileUpdate(loaderUser);

  const sectionProps = { user, saveProfile, isSaving };

  return (
    <>
      <ProfileHeroSection />
      <section className="bg-surface-container/50 shadow-primary/25 px-margin-mobile p-gutter mx-auto my-32 flex min-w-4xl flex-col gap-6 rounded-2xl shadow-md">
        <ProfileSection {...sectionProps} />
        <AboutMe {...sectionProps} />
        <Preferences {...sectionProps} />
        <ProfileLogout />
      </section>
    </>
  );
}
