import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category_id: "",
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setProducts(data || []);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase.from("categories").select("id, name");

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

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (error) {
        toast({
          title: "Erro ao atualizar produto",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Produto atualizado com sucesso!" });
    } else {
      const { error } = await supabase.from("products").insert([productData]);

      if (error) {
        toast({
          title: "Erro ao criar produto",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Produto criado com sucesso!" });
    }

    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", image_url: "", category_id: "" });
    loadProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category_id: product.category_id,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir produto",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Produto excluído com sucesso!" });
    loadProducts();
  };

  const openNewDialog = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", image_url: "", category_id: "" });
    setIsDialogOpen(true);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "N/A";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Produtos</h2>
          <p className="text-muted-foreground">Gerencie os produtos do mercadinho</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="w-5 h-5 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden border-2">
            <div className="h-48 bg-muted">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {getCategoryName(product.category_id)}
              </p>
              <p className="text-xl font-bold text-primary mb-4">
                R$ {product.price.toFixed(2)}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editar Produto" : "Novo Produto"}
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
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
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
