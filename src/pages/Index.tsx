
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, ShoppingBag, Mic, Search, CreditCard, Users } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 hover-lift">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-slow">
              <span className="text-white font-bold text-sm">BnL</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Buy n Large
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover-lift">
              Productos
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover-lift">
              Características 
              <Badge variant="secondary" className="ml-1 animate-bounce-gentle">Nuevo</Badge>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 animate-scale-in stagger-1">
            ✨ Experiencia de Compra del Futuro
          </Badge>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 animate-fade-in-up stagger-2">
            El futuro del comercio está aquí
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up stagger-3 max-w-3xl mx-auto leading-relaxed">
            Descubre productos increíbles con nuestra plataforma potenciada por IA, 
            autenticación empresarial y experiencia de compra revolucionaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-4">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-110 hover-glow shadow-lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explorar Productos
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-2 border-blue-200 hover:border-blue-400 bg-white/80 backdrop-blur-sm hover:bg-white transform transition-all duration-300 hover:scale-110 hover-lift">
                <Sparkles className="mr-2 h-5 w-5" />
                Ver Características
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <FeaturedProductsCarousel />

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 animate-bounce-gentle">
            🚀 Tecnología Avanzada
          </Badge>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Características Innovadoras
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experimenta el comercio electrónico del futuro con nuestras funcionalidades avanzadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover-lift hover-glow transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in-up stagger-1">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <Mic className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Asistente de Voz IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Habla naturalmente para buscar productos y obtener recomendaciones personalizadas
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift hover-glow transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in-up stagger-2">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <Search className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Búsqueda Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Encuentra exactamente lo que necesitas con nuestra búsqueda potenciada por IA
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift hover-glow transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in-up stagger-3">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Auth Empresarial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Integración completa con Microsoft Azure para autenticación empresarial segura
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift hover-glow transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in-up stagger-4">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Pagos Seguros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Sistema de pagos robusto con múltiples métodos y procesamiento seguro
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20 animate-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 animate-bounce-gentle">
              🎯 Únete Ahora
            </Badge>
            <h3 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
              ¿Listo para experimentar el futuro?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed animate-fade-in-up">
              Únete a miles de usuarios que ya están disfrutando de la experiencia de compra más avanzada
            </p>
            <Link to="/features">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50 transform transition-all duration-300 hover:scale-110 hover-lift shadow-xl animate-scale-in">
                <Sparkles className="mr-2 h-5 w-5" />
                Probar Características
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
