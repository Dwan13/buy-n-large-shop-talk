import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Filter, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb'; // Importa el componente Breadcrumb
import ImageWithLoading from "@/components/ImageWithLoading";
import ProductCardSkeleton from '@/components/ProductCardSkeleton'; // Importar el nuevo componente
import styles from './Products.module.css'; // Importa tu CSS Module

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  const { data: products, isLoading, error } = useQuery<{
    id: string;
    name: string;
    price?: number;
    description?: string;
    category?: string;
    image_url?: string;
  }[]>({ // Añadir isLoading y error
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return data;
    },
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = (product: any) => {
    if (!product.price) {
      toast.error("This product doesn't have a price set");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url
    });

    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">Please try again later</p>
          <p className="text-gray-600">Error details: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productsContainer}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className={styles.productTitle}>Buy n Large Marketplace</h1>
          <p className="text-xl text-gray-600">Everything you need, delivered to your door</p>
        </div>

        {/* Add Breadcrumb here */}
        <div className="mb-4">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }]} />
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
                {Array.from(new Set(products?.map(p => p.category).filter(Boolean) || [])).map((category) => (
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
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card className={`${styles.productCard} hover:shadow-lg transition-shadow flex flex-col cursor-pointer`}>
                <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
                  <ImageWithLoading
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-lg truncate">{product.name}</CardTitle>
                  {product.category && (
                    <p className="text-sm text-blue-600 font-medium">{product.category}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {product.description && (
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    {product.price && (
                      <div className={`${styles.productPrice} text-2xl font-bold`}>
                        ${product.price}
                      </div>
                    )}
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // Evita que el botón siga el link
                        handleAddToCart(product);
                      }}
                      className={styles.addToCartButton}
                      disabled={!product.price}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

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
