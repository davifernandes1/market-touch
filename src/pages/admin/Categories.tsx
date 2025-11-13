import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    display_order: 0,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Erro ao carregar categorias",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setCategories(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      const { error } = await supabase
        .from("categories")
        .update(formData)
        .eq("id", editingCategory.id);

      if (error) {
        toast({
          title: "Erro ao atualizar categoria",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Categoria atualizada com sucesso!" });
    } else {
      const { error } = await supabase.from("categories").insert([formData]);

      if (error) {
        toast({
          title: "Erro ao criar categoria",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Categoria criada com sucesso!" });
    }

    setIsDialogOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", image_url: "", display_order: 0 });
    loadCategories();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      image_url: category.image_url,
      display_order: category.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir categoria",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Categoria excluída com sucesso!" });
    loadCategories();
  };

  const openNewDialog = () => {
    setEditingCategory(null);
    setFormData({ name: "", image_url: "", display_order: 0 });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Categorias</h2>
          <p className="text-muted-foreground">Gerencie as categorias de produtos</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="w-5 h-5 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden border-2">
            <div className="h-48 bg-muted">
              <img
                src={category.image_url}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ordem: {category.display_order}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Editar Categoria" : "Nova Categoria"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="image_url">URL da Imagem</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="display_order">Ordem de Exibição</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({ ...formData, display_order: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
