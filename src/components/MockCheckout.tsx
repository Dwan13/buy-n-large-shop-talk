
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Loader2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useMockPayments } from '@/hooks/useMockPayments';
import { useMockAuth } from '@/hooks/useMockAuth';

const MockCheckout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { paymentMethods, processPayment, isProcessing } = useMockPayments();
  const { isAuthenticated, user } = useMockAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const total = getTotalPrice();

  const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      return;
    }

    const result = await processPayment(items, total, selectedPaymentMethod);
    
    if (result.success) {
      clearCart();
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
            <p className="text-gray-600">Inicia sesión para proceder con la compra</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
            <p className="text-gray-600">Tu carrito está vacío</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Checkout - Pago Simulado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Información del usuario */}
        <div>
          <h3 className="font-semibold mb-2">Información de envío</h3>
          <p className="text-sm text-gray-600">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        <Separator />

        {/* Resumen de productos */}
        <div>
          <h3 className="font-semibold mb-3">Resumen del pedido</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Método de pago */}
        <div>
          <h3 className="font-semibold mb-3">Método de pago</h3>
          <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un método de pago" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botón de pago */}
        <Button 
          onClick={handleCheckout}
          disabled={!selectedPaymentMethod || isProcessing}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Procesando pago...
            </>
          ) : (
            `Pagar $${total.toFixed(2)}`
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Modo de desarrollo - Pago simulado (95% éxito)
        </p>
      </CardContent>
    </Card>
  );
};

export default MockCheckout;
