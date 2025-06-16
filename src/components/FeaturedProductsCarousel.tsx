
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
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-purple-50 overflow-hidden">
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

        <div className="relative animate-slide-in-right px-4 py-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 pb-8">
                  <div className="group relative perspective-1000 h-full">
                    <Card className="h-full transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden transform-gpu will-change-transform group-hover:-translate-y-4">
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-t-lg flex-shrink-0">
                          {product.badge && (
                            <Badge 
                              className={`absolute top-3 left-3 z-10 animate-bounce transition-all duration-300 group-hover:scale-110 ${
                                product.badge === 'Oferta' ? 'bg-red-500 hover:bg-red-600' :
                                product.badge === 'Nuevo' ? 'bg-green-500 hover:bg-green-600' :
                                'bg-blue-500 hover:bg-blue-600'
                              }`}
                            >
                              {product.badge}
                            </Badge>
                          )}
                          <div className="relative overflow-hidden">
                            <ImageWithLoading
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs transition-all duration-300 group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700">
                              {product.category}
                            </Badge>
                            <div className="flex items-center space-x-1 transition-all duration-300 group-hover:scale-110">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-all duration-300 group-hover:fill-yellow-500 group-hover:text-yellow-500" />
                              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{product.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-4 text-gray-900 group-hover:text-blue-600 transition-all duration-300 line-clamp-2 flex-grow">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-blue-600 transition-all duration-300 group-hover:text-blue-700 group-hover:scale-105">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through transition-all duration-300 group-hover:text-red-500">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <Link to={`/products/${product.id}`}>
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform transition-all duration-300 hover:scale-125 hover:rotate-3 shadow-lg hover:shadow-2xl group-hover:animate-pulse"
                              >
                                <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
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
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-200" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-200" />
          </Carousel>
        </div>

        <div className="text-center mt-8 animate-fade-in">
          <Link to="/products">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-blue-200 hover:border-blue-400 group"
            >
              Ver Todos los Productos
              <ShoppingBag className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
