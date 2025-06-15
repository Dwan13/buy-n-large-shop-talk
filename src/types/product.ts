
// Re-export from domain layer for backward compatibility
export { ProductEntity as Product } from '../domain/entities/Product';
export type { Product as ProductInterface } from '../domain/entities/Product';

// Import the Product type for use in SearchResponse
import type { Product } from '../domain/entities/Product';

// Export SearchResponse interface
export interface SearchResponse {
  query: string;
  response: string;
  products: Product[];
  total_found: number;
}
