
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/atoms/Button/Button';
import { Typography } from '../components/atoms/Typography/Typography';
import { Price } from '../components/atoms/Price/Price';
import { useProduct } from '../hooks/useProduct';
import Breadcrumb from '@/components/Breadcrumb';
import ImageWithLoading from '@/components/ImageWithLoading';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="body1">Loading product...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="body1" color="error">
          Error loading product: {error.message}
        </Typography>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="body1">Product not found.</Typography>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: product.name, path: `/products/${id}` },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      <div className="mb-4">
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <ImageWithLoading
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="md:w-1/2">
          <Typography variant="h1" className="mb-4">
            {product.name}
          </Typography>
          
          <Typography variant="body1" className="text-gray-700 mb-6">
            {product.description}
          </Typography>
          
          <div className="mb-6">
            <Price value={product.price} size="lg" />
          </div>
          
          <Link to="/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
