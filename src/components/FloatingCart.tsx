
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

const FloatingCart = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <CartDrawer>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all bg-green-600 hover:bg-green-700 relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </Button>
      </CartDrawer>
    </div>
  );
};

export default FloatingCart;
