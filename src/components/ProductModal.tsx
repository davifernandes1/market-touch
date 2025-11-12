import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-card rounded-3xl max-w-3xl w-full mx-8 overflow-hidden shadow-smooth animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 rounded-full"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-96 md:h-auto bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
              <p className="text-4xl font-bold text-primary mb-8">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-xl"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-6 h-6" />
                </Button>
                <span className="text-3xl font-bold w-16 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-xl"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="action"
                size="lg"
                className="w-full h-16 text-xl"
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
