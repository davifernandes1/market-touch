import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ProductModal } from "@/components/ProductModal";
import { MiniCart } from "@/components/MiniCart";
import { useIdleTimer } from "@/hooks/useIdleTimer";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

interface Category {
  id: string;
  name: string;
  image_url: string;
}

interface DbProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
}

const ProductList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart, total } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  useIdleTimer();

  useEffect(() => {
    loadCategories();
    loadCategory();
    loadProducts();
  }, [categoryId]);

  const loadCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) {
      setCategories(data);
    }
  };

  const loadCategory = async () => {
    if (!categoryId) return;

    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .maybeSingle();

    if (data) {
      setCategory(data);
    }
  };

  const loadProducts = async () => {
    if (!categoryId) return;

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", categoryId);

    if (data) {
      const mappedProducts: Product[] = data.map((p: DbProduct) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image_url,
        category: p.category_id,
      }));
      setProducts(mappedProducts);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setShowMiniCart(true);
    setTimeout(() => setShowMiniCart(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-card">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate("/home")}
              className="rounded-xl"
            >
              <ChevronLeft className="w-6 h-6" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">{category?.name}</h1>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar de Categorias */}
        <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-5rem)] sticky top-20 hidden lg:block">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Categorias</h2>
            <div className="space-y-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={cat.id === categoryId ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => navigate(`/products/${cat.id}`)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 px-8 py-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-2 hover:border-primary hover:shadow-smooth transition-all duration-300"
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button
                  variant="action"
                  size="lg"
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <Plus className="w-5 h-5" />
                  Adicionar
                </Button>
              </div>
            </Card>
            ))}
          </div>
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

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Mini Cart */}
      <MiniCart isOpen={showMiniCart} onClose={() => setShowMiniCart(false)} />
    </div>
  );
};

export default ProductList;
