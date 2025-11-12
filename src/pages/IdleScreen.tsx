import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroStore from "@/assets/hero-store.jpg";

const IdleScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleInteraction = () => {
      navigate("/home");
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroStore})`,
        }}
      />
      
      <div className="relative z-10 text-center text-white px-8">
        <h1 className="text-7xl font-bold mb-8 animate-scale-in">
          Mercadinho do Condomínio
        </h1>
        <p className="text-3xl mb-16 text-white/90">
          Bem-vindo! Faça suas compras de forma rápida e prática.
        </p>
        <div className="text-2xl font-semibold animate-pulse">
          Toque para Iniciar
        </div>
      </div>
    </div>
  );
};

export default IdleScreen;
