
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  similarity?: number;
}

export interface SearchResponse {
  query: string;
  response: string;
  products: Product[];
  total_found: number;
}
