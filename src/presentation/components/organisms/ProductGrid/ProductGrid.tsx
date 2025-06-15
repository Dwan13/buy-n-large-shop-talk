
import React from 'react';
import { ProductEntity } from '../../../../domain/entities/Product';
import { ProductCard } from '../../molecules/ProductCard/ProductCard';
import { Typography } from '../../atoms/Typography/Typography';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

interface ProductGridProps {
  products: ProductEntity[];
  onAddToCart: (product: ProductEntity) => void;
  isLoading?: boolean;
  searchTerm?: string;
  selectedCategory?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  isLoading = false,
  searchTerm,
  selectedCategory
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Typography variant="h4" className="text-gray-700 mb-2">
          No products found
        </Typography>
        <Typography variant="body1" className="text-gray-500">
          {searchTerm || selectedCategory !== 'all' 
            ? 'Try adjusting your search criteria or browse all products'
            : 'Check back soon for new items!'
          }
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
