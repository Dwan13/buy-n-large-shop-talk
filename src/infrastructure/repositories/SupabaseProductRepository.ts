
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductEntity } from '../../domain/entities/Product';
import { supabase } from '../services/supabase/client';

export class SupabaseProductRepository implements ProductRepository {
  async findAll(): Promise<ProductEntity[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    
    return data?.map(item => ProductEntity.fromApiResponse(item)) || [];
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    
    return data ? ProductEntity.fromApiResponse(data) : null;
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);
    
    if (error) throw error;
    
    return data?.map(item => ProductEntity.fromApiResponse(item)) || [];
  }

  async search(query: string): Promise<ProductEntity[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`);
    
    if (error) throw error;
    
    return data?.map(item => ProductEntity.fromApiResponse(item)) || [];
  }
}
