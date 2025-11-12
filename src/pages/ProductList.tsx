import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products, categories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductModal } from "@/components/ProductModal";
import { MiniCart } from "@/components/MiniCart";
import { Product } from "@/types/product";

const ProductList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart, total } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showMiniCart, setShowMiniCart] = useState(false);

  const category = categories.find((c) => c.id === categoryId);
  const filteredProducts = products.filter((p) => p.category === categoryId);

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

      {/* Products Grid */}
      <div className="container mx-auto px-8 py-8 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
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
