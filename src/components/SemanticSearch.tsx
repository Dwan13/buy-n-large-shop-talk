
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2, Star } from 'lucide-react';
import { useRAGSearch } from '@/hooks/useRAGSearch';

const SemanticSearch = () => {
  const [query, setQuery] = useState('');
  const { searchProducts, isLoading, lastResponse } = useRAGSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    await searchProducts(query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Búsqueda Inteligente con IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca productos de forma natural, ej: 'necesito una cámara para grabar vlogs'"
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !query.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {lastResponse && (
        <div className="space-y-4">
          {/* Respuesta del asistente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Respuesta del Asistente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{lastResponse.response}</p>
            </CardContent>
          </Card>

          {/* Productos encontrados */}
          {lastResponse.products && lastResponse.products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Productos Recomendados ({lastResponse.total_found})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lastResponse.products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 space-y-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">
                            {(product.similarity * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Categoría: {product.category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SemanticSearch;
