import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/hooks';
import { usersApi, type IEvent, type TTicketTier } from '@/services';
import { authSchema, type TAuthFormValues } from '@/schemas/authSchema';
import { getInitials } from '@/utils';

interface ILoginLocationState {
  from?: string;
  event?: IEvent;
  selectedTier?: TTicketTier | null;
}

export function useAuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<TAuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '', name: '' },
    mode: 'onTouched',
  });

  const onSubmit = methods.handleSubmit(async values => {
    setIsSubmitting(true);
    try {
      const matches = await usersApi.getByEmail(values.email);
      const existing = matches[0];

      if (existing) {
        if (existing.password !== values.password) {
          toast.error('Login failed');
          return;
        }

        const { password: _, ...user } = existing;
        login(user);
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        const avatar = getInitials(values.name);
        const created = await usersApi.create({
          name: values.name,
          email: values.email,
          password: values.password,
          avatar,
        });

        const { password: _, ...user } = created;
        login(user);
        toast.success('Welcome! Your account has been created.');
      }

      const state = location.state as ILoginLocationState | null;
      if (state?.from === '/registration' && state.event) {
        navigate('/registration', {
          state: { event: state.event, selectedTier: state.selectedTier ?? null },
        });
      } else if (state?.from) {
        navigate(state.from);
      } else {
        navigate('/');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  });

  return { methods, onSubmit, isSubmitting };
}
