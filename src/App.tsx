
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import MockFeatures from "./pages/MockFeatures";
import FloatingAssistant from "./components/FloatingAssistant";
import FloatingCart from "./components/FloatingCart";
import ProductDetailPage from './pages/ProductDetailPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/features" element={<MockFeatures />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingAssistant />
          <FloatingCart />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
