
import { useState } from 'react';
import { toast } from 'sonner';
import { CartItem } from '@/contexts/CartContext';

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay';
  name: string;
  lastFour?: string;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const useMockPayments = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const mockPaymentMethods: PaymentMethod[] = [
    { id: '1', type: 'credit_card', name: 'Visa ****1234', lastFour: '1234' },
    { id: '2', type: 'debit_card', name: 'Mastercard ****5678', lastFour: '5678' },
    { id: '3', type: 'paypal', name: 'PayPal (usuario@email.com)' },
    { id: '4', type: 'apple_pay', name: 'Apple Pay' },
  ];

  const processPayment = async (
    items: CartItem[],
    total: number,
    paymentMethodId: string
  ): Promise<PaymentResult> => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular 95% de éxito en pagos
    const success = Math.random() > 0.05;
    
    setIsProcessing(false);
    
    if (success) {
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      toast.success(`¡Pago procesado exitosamente! ID: ${transactionId}`);
      
      return {
        success: true,
        transactionId
      };
    } else {
      const error = 'Error al procesar el pago. Intenta de nuevo.';
      toast.error(error);
      
      return {
        success: false,
        error
      };
    }
  };

  return {
    paymentMethods: mockPaymentMethods,
    processPayment,
    isProcessing
  };
};
