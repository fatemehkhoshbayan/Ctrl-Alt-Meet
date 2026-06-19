import { useQuery } from '@tanstack/react-query';
import categoriesServices from './categories.services';
import queryKeys from '../enums';

const CATEGORIES_STALE_TIME = 60_000;

export function useCategories() {
  return useQuery({
    queryKey: [queryKeys.GET_CATEGORIES],
    queryFn: categoriesServices.getCategories,
    staleTime: CATEGORIES_STALE_TIME,
  });
}
