
import { useQuery } from '@tanstack/react-query';
import { Container } from '../../infrastructure/di/Container';
import { GetProductByIdUseCase } from '../../domain/usecases/GetProductByIdUseCase';

export const useProduct = (id: string) => {
  const container = Container.getInstance();
  const getProductByIdUseCase = container.get<GetProductByIdUseCase>('GetProductByIdUseCase');

  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductByIdUseCase.execute(id),
    enabled: !!id,
  });
};
