
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, Filter } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  // Get unique categories for the filter dropdown
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map(product => product.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter products based on search term and selected category
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

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
        
        {/* Filter and Search Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 sm:w-64">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        {(searchTerm || selectedCategory !== "all") && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products?.length || 0} products
              {searchTerm && (
                <span> for "{searchTerm}"</span>
              )}
              {selectedCategory !== "all" && (
                <span> in "{selectedCategory}"</span>
              )}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
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
        
        {filteredProducts.length === 0 && products && products.length > 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all products
            </p>
          </div>
        )}

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
