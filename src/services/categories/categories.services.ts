import { clients } from '../clients';
import categoriesEndpoint from './categories.endpoint';
import type { TCategory } from './categories.type';

const categoriesServices = {
  getCategories: () => clients<TCategory[]>(categoriesEndpoint.categories, { method: 'GET' }),
};

export default categoriesServices;
