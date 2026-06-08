import { Loader2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth, useAuthForm } from '@/hooks';
import { Button, Input } from '@/ui';
import type { TAuthFormValues } from '@/schemas/authSchema';

function inputClass(hasError: boolean) {
  return [
    'bg-surface-container-high text-on-surface placeholder:text-on-surface-variant w-full rounded-lg px-4 py-3 transition-all outline-none',
    'focus:border-primary focus:ring-primary border focus:ring-1',
    hasError ? 'border-red-400' : 'border-outline-variant',
  ].join(' ');
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const {
    methods: {
      register,
      formState: { errors },
    },
    onSubmit,
    isSubmitting,
  } = useAuthForm();

  if (user) {
    return (
      <div className="bg-surface-container border-outline-variant mx-auto max-w-2xl rounded-2xl border p-20 text-center">
        <div className="bg-primary text-on-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold">
          {user.avatar}
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
    <form
      onSubmit={onSubmit}
      className="bg-surface-container border-outline-variant mx-auto max-w-md rounded-2xl border p-10"
    >
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Welcome</h2>
      <p className="text-on-surface-variant text-body-md mb-8">
        Enter your credentials below. New here? We&apos;ll create your account automatically.
      </p>

      <div className="gap-gutter flex flex-col">
        <Input<TAuthFormValues>
          label="Email Address"
          id="email"
          type="email"
          placeholder="you@example.com"
          register={register}
          className={inputClass(!!errors.email)}
        >
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </Input>

        <Input<TAuthFormValues>
          label="Password"
          id="password"
          type="password"
          placeholder="Your password"
          register={register}
          className={inputClass(!!errors.password)}
        >
          {errors.password && (
            <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
          )}
        </Input>

        <Input<TAuthFormValues>
          label="Full Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          register={register}
          className={inputClass(!!errors.name)}
        >
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          <p className="text-on-surface-variant mt-1 text-xs">
            Name is used when creating a new account.
          </p>
        </Input>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={isSubmitting}
        BtnText={isSubmitting ? 'Signing in…' : 'Continue'}
        icon={isSubmitting ? <Loader2 size={18} className="animate-spin" /> : undefined}
      />
    </form>
  );
}
