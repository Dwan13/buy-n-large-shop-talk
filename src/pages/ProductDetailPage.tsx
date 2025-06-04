import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb'; // Importa el componente Breadcrumb
import ImageWithLoading from '@/components/ImageWithLoading';
import { Product } from '@/types/product';


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      if (!id) throw new Error('Product ID is missing');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });

  const { data: product, isLoading, error } = productQuery;

  if (isLoading) {
    return <div className="container mx-auto p-4">Cargando producto...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error al cargar el producto: {error.message}</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4">Producto no encontrado.</div>;
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: product?.name || 'Product Details', path: `/products/${id}` },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} /> {/* Usa el componente Breadcrumb */}
      </div>
      <div className="mb-4">
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <ImageWithLoading
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">${product.price.toFixed(2)}</p>
          {/* Botón para volver a productos */}
          <Link to="/products">
            <Button className="mt-4">Volver a Productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
