import { clients } from '../clients';
import type { IUserWithPassword, TCreateUserPayload } from './users.type';

export const usersApi = {
  getByEmail: (email: string) =>
    clients<IUserWithPassword[]>(`/users?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    }),
  create: (payload: TCreateUserPayload) =>
    clients<IUserWithPassword>('/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
