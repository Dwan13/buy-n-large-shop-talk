
import { useQuery } from '@tanstack/react-query';
import { Container } from '../../infrastructure/di/Container';
import { GetProductsUseCase } from '../../domain/usecases/GetProductsUseCase';

export const useProducts = () => {
  const container = Container.getInstance();
  const getProductsUseCase = container.get<GetProductsUseCase>('GetProductsUseCase');

  return useQuery({
    queryKey: ['products'],
    queryFn: () => getProductsUseCase.execute(),
  });
};
