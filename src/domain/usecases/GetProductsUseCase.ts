
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductEntity } from '../entities/Product';

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return await this.productRepository.findAll();
  }
}
