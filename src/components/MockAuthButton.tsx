
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, LogOut, User, Building } from 'lucide-react';
import { useMockAuth } from '@/hooks/useMockAuth';

const MockAuthButton = () => {
  const { user, isLoading, signIn, signOut, isAuthenticated } = useMockAuth();

  if (isAuthenticated && user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Usuario Autenticado (Mock)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm"><strong>Nombre:</strong> {user.name}</p>
            <p className="text-sm"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm flex items-center gap-1">
              <Building className="h-4 w-4" />
              <strong>Tenant:</strong> {user.tenantId}
            </p>
          </div>
          <Button onClick={signOut} variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Autenticación Microsoft (Mock)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={signIn} 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <LogIn className="h-4 w-4 mr-2" />
          {isLoading ? 'Autenticando...' : 'Iniciar Sesión con Microsoft'}
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Modo de desarrollo - Autenticación simulada
        </p>
      </CardContent>
    </Card>
  );
};

export default MockAuthButton;
