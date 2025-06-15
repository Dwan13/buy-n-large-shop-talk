
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import MockAuthButton from '@/components/MockAuthButton';
import MockCheckout from '@/components/MockCheckout';
import SemanticSearch from '@/components/SemanticSearch';
import AlternativeVoiceAssistant from '@/components/AlternativeVoiceAssistant';

const MockFeatures = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buy n Large - Funcionalidades Avanzadas
          </h1>
          <p className="text-gray-600">
            Demostración de características integradas con implementaciones mock
          </p>
        </div>

        <Tabs defaultValue="auth" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="auth">Autenticación</TabsTrigger>
            <TabsTrigger value="assistant">Asistente IA</TabsTrigger>
            <TabsTrigger value="search">Búsqueda</TabsTrigger>
            <TabsTrigger value="checkout">Checkout</TabsTrigger>
          </TabsList>

          <TabsContent value="auth" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MockAuthButton />
              <Card>
                <CardHeader>
                  <CardTitle>Características de Autenticación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Single Sign-On (SSO)</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Mock</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Multi-tenant Support</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Mock</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Azure AD Integration</span>
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Pending API</span>
                  </div>
                  <Separator />
                  <p className="text-xs text-gray-500">
                    La autenticación real con Microsoft Azure se activará cuando se configuren las credenciales.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assistant" className="mt-6">
            <AlternativeVoiceAssistant />
          </TabsContent>

          <TabsContent value="search" className="mt-6">
            <SemanticSearch />
          </TabsContent>

          <TabsContent value="checkout" className="mt-6">
            <MockCheckout />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MockFeatures;
