import { clients } from '../clients';
import type { TCategory } from './categories.type';

export const categoriesApi = {
  getAll: () => clients<TCategory[]>('/categories', { method: 'GET' }),
};
