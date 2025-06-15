
import React, { useState, useMemo } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Typography } from '../components/atoms/Typography/Typography';
import { SearchBar } from '../components/molecules/SearchBar/SearchBar';
import { ProductGrid } from '../components/organisms/ProductGrid/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { ProductEntity } from '../../domain/entities/Product';
import Breadcrumb from '@/components/Breadcrumb';

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  const { data: products, isLoading, error } = useProducts();

  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = (product: ProductEntity) => {
    if (!product.isValidPrice) {
      toast.error("This product doesn't have a price set");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.imageUrl
    });

    toast.success(`${product.name} added to cart!`);
  };

  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="error" className="mb-2">
            Error Loading Products
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Please try again later
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Typography variant="h1" className="mb-4">
          Buy n Large Marketplace
        </Typography>
        <Typography variant="h5" className="text-gray-600">
          Everything you need, delivered to your door
        </Typography>
      </div>

      <div className="mb-4">
        <Breadcrumb items={[
          { label: 'Home', path: '/' }, 
          { label: 'Products', path: '/products' }
        ]} />
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {(searchTerm || selectedCategory !== "all") && (
        <div className="mb-6 text-center">
          <Typography variant="body1" className="text-gray-600">
            Showing {filteredProducts.length} of {products?.length || 0} products
            {searchTerm && <span> for "{searchTerm}"</span>}
            {selectedCategory !== "all" && <span> in "{selectedCategory}"</span>}
          </Typography>
        </div>
      )}

      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        isLoading={isLoading}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default ProductsPage;
