
import { ProductEntity } from '../entities/Product';

export interface ProductRepository {
  findAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  findByCategory(category: string): Promise<ProductEntity[]>;
  search(query: string): Promise<ProductEntity[]>;
}
