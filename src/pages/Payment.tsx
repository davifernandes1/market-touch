import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useIdleTimer } from "@/hooks/useIdleTimer";

const Payment = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  useIdleTimer();

  // Simula confirmação de pagamento após 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(true);
      setTimeout(() => {
        clearCart();
        navigate("/success");
      }, 2000);
    }, 8000);

    return () => clearTimeout(timer);
  }, [clearCart, navigate]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              onClick={() => navigate("/cart")}
              className="rounded-xl"
            >
              <ChevronLeft className="w-6 h-6" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Pagamento</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Payment Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Pague com PIX</h2>
              <p className="text-xl text-muted-foreground">
                Escaneie o QR Code ou copie a chave PIX
              </p>
            </div>

            <Card className="p-12 border-2 text-center space-y-8 animate-scale-in">
              <div className="w-full max-w-sm mx-auto aspect-square bg-muted rounded-2xl flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full p-8"
                  fill="currentColor"
                >
                  <rect x="0" y="0" width="20" height="20" />
                  <rect x="30" y="0" width="10" height="10" />
                  <rect x="50" y="0" width="10" height="10" />
                  <rect x="70" y="0" width="10" height="10" />
                  <rect x="80" y="0" width="20" height="20" />
                  <rect x="0" y="30" width="10" height="10" />
                  <rect x="30" y="30" width="10" height="10" />
                  <rect x="50" y="30" width="10" height="10" />
                  <rect x="70" y="30" width="10" height="10" />
                  <rect x="90" y="30" width="10" height="10" />
                  <rect x="0" y="50" width="10" height="10" />
                  <rect x="30" y="50" width="10" height="10" />
                  <rect x="50" y="50" width="10" height="10" />
                  <rect x="70" y="50" width="10" height="10" />
                  <rect x="90" y="50" width="10" height="10" />
                  <rect x="0" y="70" width="10" height="10" />
                  <rect x="30" y="70" width="10" height="10" />
                  <rect x="50" y="70" width="10" height="10" />
                  <rect x="70" y="70" width="10" height="10" />
                  <rect x="90" y="70" width="10" height="10" />
                  <rect x="0" y="80" width="20" height="20" />
                  <rect x="30" y="90" width="10" height="10" />
                  <rect x="50" y="90" width="10" height="10" />
                  <rect x="70" y="90" width="10" height="10" />
                  <rect x="80" y="80" width="20" height="20" />
                </svg>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full h-14"
                onClick={handleCopyPix}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Chave Copiada!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Chave PIX
                  </>
                )}
              </Button>

              {processing ? (
                <div className="text-center py-4">
                  <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-lg font-semibold text-primary">
                    Processando pagamento...
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Aguardando confirmação do pagamento...
                </p>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Resumo do Pedido</h3>
            <Card className="p-8 border-2 space-y-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t-2 pt-6">
                <div className="flex justify-between items-center text-3xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
