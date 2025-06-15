
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithLoading from './ImageWithLoading';

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  badge?: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Auriculares Premium Inalámbricos',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Electrónicos',
    rating: 4.8,
    badge: 'Oferta'
  },
  {
    id: '2',
    name: 'Smartphone Ultra 5G',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'Móviles',
    rating: 4.9,
    badge: 'Nuevo'
  },
  {
    id: '3',
    name: 'Laptop Gaming Pro',
    price: 1299.99,
    originalPrice: 1499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    category: 'Computadoras',
    rating: 4.7,
    badge: 'Bestseller'
  },
  {
    id: '4',
    name: 'Reloj Inteligente Sport',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'Wearables',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Cámara Mirrorless 4K',
    price: 799.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    category: 'Fotografía',
    rating: 4.8,
    badge: 'Oferta'
  }
];

const FeaturedProductsCarousel = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 animate-scale-in">
            Productos Destacados
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Los Más Populares
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Descubre los productos más vendidos y mejor valorados por nuestra comunidad
          </p>
        </div>

        <div className="relative animate-slide-in-right">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative">
                    <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          {product.badge && (
                            <Badge 
                              className={`absolute top-3 left-3 z-10 animate-bounce ${
                                product.badge === 'Oferta' ? 'bg-red-500' :
                                product.badge === 'Nuevo' ? 'bg-green-500' :
                                'bg-blue-500'
                              }`}
                            >
                              {product.badge}
                            </Badge>
                          )}
                          <ImageWithLoading
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">{product.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-blue-600">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <Link to={`/products/${product.id}`}>
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700 transform transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl"
                              >
                                <ShoppingBag className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg" />
          </Carousel>
        </div>

        <div className="text-center mt-8 animate-fade-in">
          <Link to="/products">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-400"
            >
              Ver Todos los Productos
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
