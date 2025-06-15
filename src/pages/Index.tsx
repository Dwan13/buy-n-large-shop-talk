
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, ShoppingBag, Mic, Search, CreditCard, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BnL</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Buy n Large</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">Productos</Link>
            <Link to="/features" className="text-gray-600 hover:text-gray-900">
              Características <Badge variant="secondary" className="ml-1">Nuevo</Badge>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            El futuro del comercio está aquí
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Descubre productos increíbles con nuestra plataforma potenciada por IA, 
            autenticación empresarial y experiencia de compra revolucionaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explorar Productos
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline">
                <Sparkles className="mr-2 h-5 w-5" />
                Ver Características
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Características Innovadoras
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experimenta el comercio electrónico del futuro con nuestras funcionalidades avanzadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Asistente de Voz IA</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Habla naturalmente para buscar productos y obtener recomendaciones personalizadas
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Búsqueda Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Encuentra exactamente lo que necesitas con nuestra búsqueda potenciada por IA
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Auth Empresarial</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Integración completa con Microsoft Azure para autenticación empresarial segura
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Pagos Seguros</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sistema de pagos robusto con múltiples métodos y procesamiento seguro
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Listo para experimentar el futuro?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están disfrutando de la experiencia de compra más avanzada
          </p>
          <Link to="/features">
            <Button size="lg" variant="secondary">
              <Sparkles className="mr-2 h-5 w-5" />
              Probar Características
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
