
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface MockUser {
  id: string;
  email: string;
  name: string;
  tenantId: string;
}

interface MockAuthResult {
  user: MockUser | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

export const useMockAuth = (): MockAuthResult => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simular verificación de sesión existente
    const savedUser = localStorage.getItem('mockAuthUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    
    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: MockUser = {
      id: 'mock-user-123',
      email: 'usuario@buynlarge.com',
      name: 'Usuario Demo',
      tenantId: 'mock-tenant-456'
    };
    
    setUser(mockUser);
    localStorage.setItem('mockAuthUser', JSON.stringify(mockUser));
    setIsLoading(false);
    
    toast.success('¡Autenticación exitosa! (Mock)');
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('mockAuthUser');
    toast.info('Sesión cerrada');
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
};
