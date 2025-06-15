
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductEntity } from '../entities/Product';

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductEntity | null> {
    if (!id) {
      throw new Error('Product ID is required');
    }
    return await this.productRepository.findById(id);
  }
}
