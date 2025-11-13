import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Package, FolderTree, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [productsResult, categoriesResult] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("categories").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      totalProducts: productsResult.count ?? 0,
      totalCategories: categoriesResult.count ?? 0,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do mercadinho
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Produtos</p>
              <p className="text-4xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Categorias</p>
              <p className="text-4xl font-bold">{stats.totalCategories}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <FolderTree className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="text-2xl font-bold">Ativo</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
