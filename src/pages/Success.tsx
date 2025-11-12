import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
      <div className="text-center px-8 max-w-2xl">
        <div className="mb-8 animate-scale-in">
          <CheckCircle className="w-40 h-40 text-primary mx-auto animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-bold mb-6 animate-scale-in">
          Compra Finalizada com Sucesso!
        </h1>
        
        <p className="text-2xl text-muted-foreground mb-4">
          Obrigado por comprar conosco.
        </p>
        
        <p className="text-xl text-muted-foreground">
          Volte sempre!
        </p>
        
        <p className="text-sm text-muted-foreground mt-12">
          Retornando à tela inicial em instantes...
        </p>
      </div>
    </div>
  );
};

export default Success;
