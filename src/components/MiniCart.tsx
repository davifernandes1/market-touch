import { useCart } from "@/context/CartContext";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { cart, total } = useCart();

  if (!isOpen || cart.length === 0) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-card border-l-2 border-border shadow-smooth z-50 animate-slide-in-right p-8">
      <h3 className="text-2xl font-bold mb-6">Adicionado ao Carrinho</h3>
      
      <div className="space-y-4 mb-6">
        {cart.slice(-3).map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 pt-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Subtotal</span>
          <span className="text-primary">R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
