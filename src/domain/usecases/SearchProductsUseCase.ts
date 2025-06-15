
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductEntity } from '../entities/Product';

export class SearchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(query: string, category?: string): Promise<ProductEntity[]> {
    if (!query.trim()) {
      return category ? 
        await this.productRepository.findByCategory(category) : 
        await this.productRepository.findAll();
    }

    const searchResults = await this.productRepository.search(query);
    
    if (category && category !== 'all') {
      return searchResults.filter(product => product.category === category);
    }
    
    return searchResults;
  }
}
