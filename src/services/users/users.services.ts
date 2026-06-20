import { clients } from '../clients';
import usersEndpoint from './users.endpoint';
import type { IUser, TUpdateUserPayload } from './users.type';

const usersServices = {
  getById: (id: string) => clients<IUser>(usersEndpoint.userById(id), { method: 'GET' }),
  update: (id: string, payload: TUpdateUserPayload) =>
    clients<IUser>(usersEndpoint.userById(id), {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};

export default usersServices;
