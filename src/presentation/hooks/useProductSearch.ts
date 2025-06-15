
import { useQuery } from '@tanstack/react-query';
import { Container } from '../../infrastructure/di/Container';
import { SearchProductsUseCase } from '../../domain/usecases/SearchProductsUseCase';

export const useProductSearch = (query: string, category?: string) => {
  const container = Container.getInstance();
  const searchProductsUseCase = container.get<SearchProductsUseCase>('SearchProductsUseCase');

  return useQuery({
    queryKey: ['products', 'search', query, category],
    queryFn: () => searchProductsUseCase.execute(query, category),
    enabled: query.trim().length > 0 || category !== undefined,
  });
};
