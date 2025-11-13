import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import IdleScreen from "./pages/IdleScreen";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IdleScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products/:categoryId" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="products" element={<Products />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
