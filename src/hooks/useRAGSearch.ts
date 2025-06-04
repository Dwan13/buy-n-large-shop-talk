
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Product } from '@/types/product';

interface RAGResponse {
  query: string;
  response: string;
  products: Product[];
  total_found: number;
}

export const useRAGSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<RAGResponse | null>(null);

  const searchProducts = async (query: string, maxResults: number = 5): Promise<RAGResponse | null> => {
    setIsLoading(true);
    try {
      console.log('Performing RAG search for:', query);
      
      const { data, error } = await supabase.functions.invoke('rag-search', {
        body: { query, maxResults }
      });

      if (error) {
        throw new Error(error.message);
      }

      const response: RAGResponse = data;
      setLastResponse(response);
      
      console.log('RAG search results:', response);
      return response;
      
    } catch (error) {
      console.error('Error in RAG search:', error);
      toast.error('Error al buscar productos: ' + error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const generateEmbeddings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-embeddings');
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast.success(`Embeddings generados: ${data.processed} productos procesados`);
      return data;
      
    } catch (error) {
      console.error('Error generating embeddings:', error);
      toast.error('Error al generar embeddings: ' + error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchProducts,
    generateEmbeddings,
    isLoading,
    lastResponse
  };
};
