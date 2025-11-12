import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Carrinho Vazio</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Adicione produtos para continuar
          </p>
          <Button size="lg" onClick={() => navigate("/home")}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-slide-up">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-card">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate("/home")}
                className="rounded-xl"
              >
                <ChevronLeft className="w-6 h-6" />
                Continuar Comprando
              </Button>
              <h1 className="text-3xl font-bold">Meu Carrinho</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Items */}
      <div className="container mx-auto px-8 py-8 pb-40">
        <div className="space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="p-6 border-2 animate-scale-in">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-2xl font-bold text-primary">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-12 w-12 rounded-xl ml-4"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-smooth z-40">
        <div className="container mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold">Total a Pagar</span>
            <span className="text-4xl font-bold text-primary">
              R$ {total.toFixed(2)}
            </span>
          </div>
          <Button
            variant="action"
            size="lg"
            className="w-full h-16 text-xl"
            onClick={() => navigate("/payment")}
          >
            Ir para o Pagamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
