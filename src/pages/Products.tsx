
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Products = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Buy n Large Marketplace</h1>
          <p className="text-xl text-gray-600">Everything you need, delivered to your door</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              {product.image_url && (
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                {product.category && (
                  <p className="text-sm text-blue-600 font-medium">{product.category}</p>
                )}
              </CardHeader>
              <CardContent>
                {product.description && (
                  <CardDescription className="mb-3">
                    {product.description}
                  </CardDescription>
                )}
                {product.price && (
                  <div className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {(!products || products.length === 0) && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products available</h3>
            <p className="text-gray-500">Check back soon for new items!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
