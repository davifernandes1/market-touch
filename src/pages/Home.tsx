import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useIdleTimer } from "@/hooks/useIdleTimer";
import { supabase } from "@/integrations/supabase/client";
import heroStore from "@/assets/hero-store.jpg";
import { MiniCart } from "@/components/MiniCart";

interface Category {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
}

const Home = () => {
  const navigate = useNavigate();
  const { total } = useCart();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  useIdleTimer();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) {
      setCategories(data);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-card">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Mercadinho</h1>
            
            <div className="flex-1 max-w-2xl mx-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="O que você procura hoje?"
                  className="pl-12 h-14 text-lg rounded-2xl border-2"
                />
              </div>
            </div>
            
            <div className="w-48" />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="container mx-auto px-8 py-8">
        <div
          className="h-80 rounded-3xl bg-cover bg-center relative overflow-hidden shadow-smooth cursor-pointer hover:scale-[1.02] transition-transform duration-500"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroStore})`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4">Produtos Frescos</h2>
              <p className="text-xl">Qualidade e praticidade para você</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-8 pb-32">
        <h2 className="text-3xl font-bold mb-8">Categorias</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-2 hover:border-primary hover:shadow-smooth transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => navigate(`/products/${category.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <div
        className="fixed bottom-8 left-8 bg-card border-2 border-border rounded-2xl px-8 py-4 shadow-smooth cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 z-50"
        onClick={() => navigate("/cart")}
      >
        <div className="flex items-center gap-4">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <div className="text-lg font-semibold">
            Total: R$ {total.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Mini Cart */}
      <MiniCart isOpen={showMiniCart} onClose={() => setShowMiniCart(false)} />
    </div>
  );
};

export default Home;
