import { FormProvider } from 'react-hook-form';
import { Loader2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth, useAuthForm } from '@/hooks';
import { UserAvatar } from '@/shared';
import { Button } from '@/ui';
import LoginFields from './LoginFields';

export default function LoginForm() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { methods, onSubmit, isSubmitting } = useAuthForm();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (user) {
    return (
      <div className="bg-surface-container border-outline-variant mx-auto max-w-2xl rounded-2xl border p-20 text-center">
        <div className="mx-auto mb-4 flex justify-center">
          <UserAvatar user={user} sizeClassName="h-16 w-16 text-xl" />
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
          Signed in as {user.name}
        </h2>
        <p className="text-on-surface-variant text-body-md mb-8">{user.email}</p>
        <Button
          color="secondary"
          className="w-full"
          BtnText="Log out"
          onClick={handleLogout}
          iconLeft={<LogOut size={20} />}
        />
      </div>
    );
  }

  return (
    <div className="bg-surface-container border-outline-variant mx-auto max-w-md rounded-2xl border p-10">
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Welcome</h2>
      <p className="text-on-surface-variant text-body-md mb-8">
        Enter your credentials below. New here? We&apos;ll create your account automatically.
      </p>

      <FormProvider {...methods}>
        <div className="flex flex-col">
          <LoginFields />
          <Button
            type="button"
            size="lg"
            className="mt-8 w-full"
            disabled={isSubmitting}
            BtnText={isSubmitting ? 'Signing in…' : 'Continue'}
            icon={isSubmitting ? <Loader2 size={18} className="animate-spin" /> : undefined}
            onClick={onSubmit}
          />
        </div>
      </FormProvider>
    </div>
  );
}
