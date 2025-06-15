
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductEntity } from '../../../../domain/entities/Product';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography/Typography';
import { Price } from '../../atoms/Price/Price';
import ImageWithLoading from '@/components/ImageWithLoading';

interface ProductCardProps {
  product: ProductEntity;
  onAddToCart?: (product: ProductEntity) => void;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isLoading = false
}) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="hover:shadow-lg transition-shadow flex flex-col cursor-pointer h-full">
        <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
          <ImageWithLoading
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardHeader className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Typography variant="caption">4.5</Typography>
            </div>
          </div>
          
          <Typography variant="h6" className="truncate">
            {product.name}
          </Typography>
        </CardHeader>
        
        <CardContent className="space-y-3 pt-0 mt-auto">
          <Typography variant="body2" className="line-clamp-2 text-gray-600">
            {product.description}
          </Typography>
          
          <div className="flex items-center justify-between">
            <Price value={product.price} />
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
              disabled={!product.isValidPrice || isLoading}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
