import { Input } from '@/ui';
import type { TAuthFormValues } from '@/schemas';
import { useFormContext } from 'react-hook-form';

function inputClass(hasError: boolean) {
  return [
    'bg-surface-container-high text-on-surface placeholder:text-on-surface-variant w-full rounded-md px-4 py-3 transition-all outline-none',
    'focus:border-primary focus:ring-primary border focus:ring-1',
    hasError ? 'border-red-400' : 'border-outline-variant',
  ].join(' ');
}

function LoginFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TAuthFormValues>();

  return (
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
        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
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
  );
}

export default LoginFields;
