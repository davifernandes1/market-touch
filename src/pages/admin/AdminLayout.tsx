import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Package, FolderTree } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { NavLink } from "@/components/NavLink";

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-card">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-8">
          <div className="flex gap-1">
            <NavLink
              to="/admin"
              end
              className="px-6 py-4 hover:bg-muted/50 transition-colors flex items-center gap-2"
              activeClassName="bg-muted border-b-2 border-primary"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/categories"
              className="px-6 py-4 hover:bg-muted/50 transition-colors flex items-center gap-2"
              activeClassName="bg-muted border-b-2 border-primary"
            >
              <FolderTree className="w-5 h-5" />
              Categorias
            </NavLink>
            <NavLink
              to="/admin/products"
              className="px-6 py-4 hover:bg-muted/50 transition-colors flex items-center gap-2"
              activeClassName="bg-muted border-b-2 border-primary"
            >
              <Package className="w-5 h-5" />
              Produtos
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
