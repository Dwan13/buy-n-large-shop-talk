
// Re-export from domain layer for backward compatibility
export { ProductEntity as Product } from '../domain/entities/Product';
export type { Product as ProductInterface } from '../domain/entities/Product';

// Export SearchResponse interface
export interface SearchResponse {
  query: string;
  response: string;
  products: ProductInterface[];
  total_found: number;
}
